package org.apereo.cas.mgmt.services.web;

import org.apache.commons.io.FileUtils;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.services.GitServicesManager;
import org.apereo.cas.mgmt.services.web.beans.RegisteredServiceItem;
import org.apereo.cas.mgmt.services.web.beans.RejectData;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.mgmt.services.web.factory.RepositoryFactory;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;
import org.apereo.cas.util.DigestUtils;
import org.apereo.cas.util.io.CommunicationsManager;
import org.eclipse.jgit.diff.RawText;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.MessageFormat;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import static java.util.stream.Collectors.toList;

/**
 * Controller class to handle accepting and rejecting submitted Services.
 *
 * @author Travis Schmidt
 */
@Controller
public class SubmissionController {

    private final RepositoryFactory repositoryFactory;
    private final ManagerFactory managerFactory;
    private final CasConfigurationProperties casProperties;
    private final CasUserProfileFactory casUserProfileFactory;
    private final CommunicationsManager communicationsManager;

    public SubmissionController(final RepositoryFactory repositoryFactory,
                                final ManagerFactory managerFactory,
                                final CasConfigurationProperties casProperties,
                                final CasUserProfileFactory casUserProfileFactory,
                                final CommunicationsManager communicationsManager) {
        this.repositoryFactory = repositoryFactory;
        this.managerFactory = managerFactory;
        this.casProperties = casProperties;
        this.casUserProfileFactory = casUserProfileFactory;
        this.communicationsManager = communicationsManager;
    }

    /**
     * Mapped method to pull list of Submitted services from the queue.
     *
     * @param response - the response
     * @param request - the request
     * @return - List of RegisteredServiceItem
     * @throws Exception - failed
     */
    @GetMapping("getSubmissions")
    public ResponseEntity<List<RegisteredServiceItem>> getSubmissions(final HttpServletResponse response,
                                                                      final HttpServletRequest request) throws Exception {
        checkForAdmin(request, response);
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        try (Stream<Path> stream = Files.list(Paths.get(casProperties.getMgmt().getSubmitDir()))) {
            List<RegisteredServiceItem> list = stream.map(p -> {
                final RegisteredService service = serializer.from(p.toFile());
                final RegisteredServiceItem serviceItem = new RegisteredServiceItem();
                serviceItem.setAssignedId(p.getFileName().toString());
                serviceItem.setEvalOrder(service.getEvaluationOrder());
                serviceItem.setName(service.getName());
                serviceItem.setServiceId(service.getServiceId());
                serviceItem.setDescription(DigestUtils.abbreviate(service.getDescription()));
                if (p.getFileName().toString().startsWith("edit")) {
                    serviceItem.setStatus("EDIT");
                } else {
                    serviceItem.setStatus("SUBMITTED");
                }
                return serviceItem;
            }).collect(toList());
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (final Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * Mapped method to return a submitted service in YAML format.
     *
     * @param response - the response
     * @param request - the request
     * @param id - file id of the submitted service
     * @return - YAML version of the service
     * @throws Exception - failed
     */
    @GetMapping("getYamlSubmission")
    public ResponseEntity<String> getYamlSubmission(final HttpServletResponse response,
                                                    final HttpServletRequest request,
                                                    @RequestParam final String id) throws Exception {
        checkForAdmin(request, response);
        final DefaultRegisteredServiceJsonSerializer jsonSerializer = new DefaultRegisteredServiceJsonSerializer();
        final RegisteredService svc = jsonSerializer.from(
                new File(casProperties.getMgmt().getSubmitDir() +"/" + id));
        final RegisteredServiceYamlSerializer yamlSerializer = new RegisteredServiceYamlSerializer();
        final ByteArrayOutputStream output = new ByteArrayOutputStream();
        yamlSerializer.to(output, svc);
        return new ResponseEntity<String>(output.toString(), HttpStatus.OK);
    }

    /**
     * Mapped method to return a JSON representation of the submitted service.
     *
     * @param request - the request
     * @param response - the response
     * @param id - the file name of the service
     * @return - JSON version of the service
     * @throws Exception - failed
     */
    @GetMapping("getJsonSubmission")
    public ResponseEntity<String> getJsonSubmission(final HttpServletRequest request,
                                                    final HttpServletResponse response,
                                                    @RequestParam final String id) throws Exception {
        checkForAdmin(request, response);
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        final RegisteredService service = serializer.from(
                new File(casProperties.getMgmt().getSubmitDir() + "/" +id));
        final ByteArrayOutputStream output = new ByteArrayOutputStream();
        serializer.to(output, service);
        return new ResponseEntity<>(output.toString(), HttpStatus.OK);
    }

    /**
     * Mapped method to delete a submission from the queue.
     *
     * @param response - the response
     * @param request - the request
     * @param data - RejectData
     * @return - status
     * @throws Exception - failed
     */
    @PostMapping(value = "rejectSubmission", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> rejectSubmission(final HttpServletResponse response,
                                                   final HttpServletRequest request,
                                                   @RequestBody final RejectData data) throws Exception {
        checkForAdmin(request, response);
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        final Path path = Paths.get(casProperties.getMgmt().getSubmitDir() + "/" + data.getId());
        final RegisteredService service = serializer.from(path.toFile());
        Files.delete(path);
        sendRejectMessage(service.getName(), data.getNote(),
                 service.getContacts().get(0).getEmail(), data.getId().contains("edit"));
        return new ResponseEntity<>("Submission deleted", HttpStatus.OK);
    }

    private void sendRejectMessage(final String submitName, final String note, final String email, final boolean isChange) {
        if (communicationsManager.isMailSenderDefined()) {
            final EmailProperties emailProps;
            if(isChange) {
                emailProps = casProperties.getMgmt().getNotifications().getRegisterRejectChange();
            } else {
                emailProps = casProperties.getMgmt().getNotifications().getRegisterReject();
            }
            communicationsManager.email(
                    MessageFormat.format(emailProps.getText(), submitName, note),
                    emailProps.getFrom(),
                    MessageFormat.format(emailProps.getSubject(), submitName),
                    email,
                    emailProps.getCc(),
                    emailProps.getBcc()
            );
        }
    }

    /**
     * Mapped method to delete a submission from the queue.
     *
     * @param response - the response
     * @param request - the request
     * @param id - file name of the service
     * @return - status
     * @throws Exception - failed
     */
    @GetMapping("addedSubmission")
    public ResponseEntity<String> addedSubmission(final HttpServletResponse response,
                                                   final HttpServletRequest request,
                                                   @RequestParam final String id) throws Exception {
        checkForAdmin(request, response);
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        final Path path = Paths.get(casProperties.getMgmt().getSubmitDir() + "/" + id);
        final RegisteredService service = serializer.from(path.toFile());
        Files.delete(path);
        sendAddedMessage(service.getName(), "", service.getContacts().get(0).getEmail());
        return new ResponseEntity<>("Submission Added", HttpStatus.OK);
    }

    private void sendAddedMessage(final String submitName, final String note, final String email) {
        if (communicationsManager.isMailSenderDefined()) {
            final EmailProperties emailProps = casProperties.getMgmt().getNotifications().getRegisterAdded();
            communicationsManager.email(
                    MessageFormat.format(emailProps.getText(), submitName, note),
                    emailProps.getFrom(),
                    MessageFormat.format(emailProps.getSubject(), submitName),
                    email,
                    emailProps.getCc(),
                    emailProps.getBcc()
            );
        }
    }
    /**
     * Mapped method that will return a diff of the submission and the current version in the repo.
     *
     * @param response - the response
     * @param request - the request
     * @param id - the file name of the submission
     * @throws Exception - failed
     */
    @GetMapping("diffSubmission")
    public void diffSubmission(final HttpServletResponse response,
                               final HttpServletRequest request,
                               @RequestParam final String id) throws Exception {
        checkForAdmin(request, response);
        final GitUtil git = repositoryFactory.masterRepository();
        final RawText subPath = new RawText(
                FileUtils.readFileToByteArray(new File(casProperties.getMgmt().getSubmitDir() + "/" + id)));
        final String[] splitSub = id.split("-");
        final RawText gitPath = new RawText(
                FileUtils.readFileToByteArray(
                        new File(casProperties.getMgmt().getServicesRepo() + "/service-" + splitSub[1])));
        response.getOutputStream().write(git.getFormatter(gitPath, subPath));
    }

    /**
     * Mapped method to accept submissions.
     *
     * @param response - the response
     * @param request - the request
     * @param id - the file name of the submission
     * @return - status
     * @throws Exception - failed
     */
    @GetMapping("acceptSubmission")
    public ResponseEntity<String> acceptSubmission(final HttpServletResponse response,
                                                   final HttpServletRequest request,
                                                   @RequestParam final String id) throws Exception {
        checkForAdmin(request, response);
        final GitServicesManager manager = managerFactory.from(request, response);
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        final Path path = Paths.get(casProperties.getMgmt().getSubmitDir() + "/" + id);
        final RegisteredService service = serializer.from(path.toFile());
        manager.save(service);
        Files.delete(path);
        sendAcceptMessage(service.getName(), service.getContacts().get(0).getEmail());
        return new ResponseEntity<>("Service Accepted", HttpStatus.OK);
    }

    private void sendAcceptMessage(final String submitName, final String email) {
        if (communicationsManager.isMailSenderDefined()) {
            final EmailProperties emailProps = casProperties.getMgmt().getNotifications().getRegisterAccept();
            communicationsManager.email(
                    MessageFormat.format(emailProps.getText(), submitName),
                    emailProps.getFrom(),
                    MessageFormat.format(emailProps.getSubject(), submitName),
                    email,
                    emailProps.getCc(),
                    emailProps.getBcc()
            );
        }
    }

    @GetMapping("importSubmission")
    public ResponseEntity<RegisteredService> importSubmission(final HttpServletResponse response,
                                                              final HttpServletRequest request,
                                                              @RequestParam final String id) throws Exception {
        checkForAdmin(request, response);
        final DefaultRegisteredServiceJsonSerializer serializer = new DefaultRegisteredServiceJsonSerializer();
        final RegisteredService service = serializer.from(
                new File(casProperties.getMgmt().getSubmitDir() + "/" + id));
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

    private void checkForAdmin(final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        final CasUserProfile casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isAdministrator()) {
            throw new IllegalAccessException("You are not authorized for this request");
        }
    }
}
