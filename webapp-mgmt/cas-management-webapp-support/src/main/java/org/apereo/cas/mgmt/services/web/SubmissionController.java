package org.apereo.cas.mgmt.services.web;

import org.apache.commons.io.FileUtils;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.services.GitServicesManager;
import org.apereo.cas.mgmt.services.web.beans.RegisteredServiceItem;
import org.apereo.cas.mgmt.services.web.factory.ManagerFactory;
import org.apereo.cas.mgmt.services.web.factory.RepositoryFactory;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;
import org.apereo.cas.util.DigestUtils;
import org.eclipse.jgit.diff.RawText;
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
import java.util.List;
import java.util.stream.Stream;
import org.springframework.http.HttpStatus;
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

    public SubmissionController(final RepositoryFactory repositoryFactory,
                                final ManagerFactory managerFactory,
                                final CasConfigurationProperties casProperties,
                                final CasUserProfileFactory casUserProfileFactory) {
        this.repositoryFactory = repositoryFactory;
        this.managerFactory = managerFactory;
        this.casProperties = casProperties;
        this.casUserProfileFactory = casUserProfileFactory;
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
     * @param id - file name of the service
     * @return - status
     * @throws Exception - failed
     */
    @GetMapping("deleteSubmission")
    public ResponseEntity<String> deleteSubmission(final HttpServletResponse response,
                                                   final HttpServletRequest request,
                                                   @RequestParam final String id) throws Exception {
        checkForAdmin(request, response);
        Files.delete(Paths.get(casProperties.getMgmt().getSubmitDir() + "/" + id));
        return new ResponseEntity<>("Submission deleted", HttpStatus.OK);
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
                        new File(casProperties.getMgmt().getServicesRepo() + "service-" + splitSub[1])));
        response.getOutputStream().write(git.getFormatter(subPath, gitPath));
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
        return new ResponseEntity<>("Service Accepted", HttpStatus.OK);
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
