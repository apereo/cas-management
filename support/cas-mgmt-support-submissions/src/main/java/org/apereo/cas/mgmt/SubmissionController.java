package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.controller.AbstractVersionControlController;
import org.apereo.cas.mgmt.domain.PendingItem;
import org.apereo.cas.mgmt.domain.RegisteredServiceItem;
import org.apereo.cas.mgmt.domain.RejectData;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.notifications.CommunicationsManager;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.UnauthorizedServiceException;
import org.apereo.cas.services.util.RegisteredServiceJsonSerializer;
import org.apereo.cas.support.saml.services.SamlRegisteredService;
import org.apereo.cas.util.DigestUtils;
import org.apereo.cas.util.EncodingUtils;
import org.apereo.cas.util.HttpUtils;
import org.apereo.cas.util.ResourceUtils;

import com.google.common.base.Splitter;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.eclipse.jgit.diff.RawText;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.UserDefinedFileAttributeView;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

/**
 * Controller class to handle accepting and rejecting submitted Services.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@RestController("casManagementSubmissisonsController")
@RequestMapping(path = "api/submissions", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class SubmissionController extends AbstractVersionControlController {

    private static final int MAX_EMAIL_LENGTH = 200;

    private final RepositoryFactory repositoryFactory;
    private final MgmtManagerFactory<? extends ServicesManager> managerFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final CasConfigurationProperties casProperties;
    private final CommunicationsManager communicationsManager;

    public SubmissionController(final RepositoryFactory repositoryFactory,
                                final MgmtManagerFactory<? extends ServicesManager> managerFactory,
                                final CasManagementConfigurationProperties managementProperties,
                                final CasConfigurationProperties casProperties,
                                final CommunicationsManager communicationsManager) {
        this.repositoryFactory = repositoryFactory;
        this.managerFactory = managerFactory;
        this.managementProperties = managementProperties;
        this.casProperties = casProperties;
        this.communicationsManager = communicationsManager;
    }

    /**
     * Mapped method to pull list of Submitted services from the queue.
     *
     * @param authentication - the user
     * @return - List of RegisteredServiceItem
     * @throws Exception - failed
     */
    @GetMapping
    public List<RegisteredServiceItem> getSubmissions(final Authentication authentication) throws Exception {
        isAdministrator(authentication);
        LOGGER.debug(managementProperties.getSubmissions().getSubmitDir());
        try (Stream<Path> stream = Files.list(Paths.get(managementProperties.getSubmissions().getSubmitDir()))) {
            return stream.map(this::createServiceItem).collect(toList());
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            throw e;
        }
    }

    /**
     * Returns list of pending submissions for logged in user.
     *
     * @param authentication - the user
     * @return - List of PendingItem
     * @throws Exception - failed
     */
    @GetMapping("/pending")
    public List<PendingItem> getPendingSubmissions(final Authentication authentication) throws Exception {
        val casUserProfile = CasUserProfile.from(authentication);
        try (Stream<Path> stream = Files.list(Paths.get(managementProperties.getSubmissions().getSubmitDir()))) {
            val list = stream.filter(p -> isSubmitter(p, casUserProfile))
                    .map(this::createPendingItem).collect(toList());

            val git = repositoryFactory.masterRepository();
            val bulks = git.branches()
                    .map(git::mapBranches)
                    .filter(b -> !b.getName().endsWith("master") && b.getCommitter().equalsIgnoreCase(casUserProfile.getId()))
                    .filter(r -> !r.isAccepted() && !r.isRejected())
                    .map(p -> createPendingItem(p, git))
                    .collect(toList());
            list.addAll(bulks);
            return list;

        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            throw e;
        }
    }

    private boolean isSubmitter(final Path p, final CasUserProfile casUserProfile) {
        return getSubmitter(p)[0].equals(casUserProfile.getEmail());
    }

    private RegisteredServiceItem createServiceItem(final Path p) {
        val serializer = new RegisteredServiceJsonSerializer();
        val service = serializer.from(p.toFile());
        val serviceItem = new RegisteredServiceItem();
        serviceItem.setAssignedId(p.getFileName().toString());
        serviceItem.setEvalOrder(service.getEvaluationOrder());
        serviceItem.setName(service.getName());
        serviceItem.setServiceId(service.getServiceId());
        serviceItem.setDescription(DigestUtils.abbreviate(service.getDescription()));
        serviceItem.setSubmitter(getSubmitter(p)[1]);
        serviceItem.setSubmitted(getSubmitted(p));
        serviceItem.setStatus(status(p.getFileName().toString()));
        serviceItem.setStaged(service.getEnvironments().contains("staged"));
        serviceItem.setType(CasManagementUtils.getType(service));
        return serviceItem;
    }

    private PendingItem createPendingItem(final Path p) {
        val service = CasManagementUtils.fromJson(p.toFile());
        val serviceItem = new PendingItem();
        serviceItem.setId(p.getFileName().toString());
        serviceItem.setName(service.getName());
        serviceItem.setServiceId(service.getServiceId());
        serviceItem.setSubmitted(getSubmitted(p));
        serviceItem.setStatus(status(p.getFileName().toString()));
        serviceItem.setType(CasManagementUtils.getType(service));
        return serviceItem;
    }

    private PendingItem createPendingItem(final GitUtil.BranchMap p, final GitUtil git) {
        try {
            val serviceItem = new PendingItem();
            serviceItem.setId(p.getId());
            serviceItem.setName(p.getFullMessage());
            serviceItem.setServiceId(git.getDiffsToRevert(p.getName()).size() + " services");
            serviceItem.setSubmitted(CasManagementUtils.formatDateTime(p.getCommitTime()));
            serviceItem.setStatus("EDIT");
            return serviceItem;
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }

    private String status(final String path) {
        if (path.startsWith("edit")) {
            return "EDIT";
        }
        if (path.startsWith("remove")) {
            return "REMOVE";
        }
        return "SUBMITTED";
    }

    /**
     * Mapped method to return a submitted service in YAML format.
     *
     * @param authentication - the user
     * @param id - file id of the submitted service
     * @return - YAML version of the service
     * @throws Exception - failed
     */
    @PostMapping("/yaml")
    public String getYamlSubmission(final Authentication authentication,
                                    final @RequestBody String id) throws Exception {
        isAdministrator(authentication);
        val svc = CasManagementUtils.fromJson(new File(managementProperties.getSubmissions().getSubmitDir() +"/" + id));
        return CasManagementUtils.toYaml(svc);
    }

    /**
     * Mapped method to return a JSON representation of the submitted service.
     *
     * @param authentication - the user
     * @param id - the file name of the service
     * @return - JSON version of the service
     * @throws Exception - failed
     */
    @PostMapping("/json")
    public String getJsonSubmission(final Authentication authentication,
                                    final @RequestBody String id) throws Exception {
        isAdministrator(authentication);
        val svc = CasManagementUtils.fromJson(new File(managementProperties.getSubmissions().getSubmitDir() + "/" +id));
        return CasManagementUtils.toJson(svc);
    }

    @PostMapping("/metadata")
    public String getMetadataSubmission(final Authentication authentication,
                                        final @RequestBody String id) throws Exception {
        isAdministrator(authentication);
        val svc = (SamlRegisteredService) CasManagementUtils.fromJson(new File(managementProperties.getSubmissions().getSubmitDir() + "/" +id));
        val location = svc.getMetadataLocation();
        if (location.contains("mdq.incommon.org")) {
            val resp = fetchMetadata(svc.getMetadataLocation().replace("{0}", EncodingUtils.urlEncode(svc.getServiceId())));
            val entity = resp.getEntity();
            return IOUtils.toString(entity.getContent(), StandardCharsets.UTF_8);
        }
        val fileName = DigestUtils.sha(svc.getServiceId()) + ".xml";
        val res = ResourceUtils.getResourceFrom("file:/" + managementProperties.getMetadataRepoDir() + "/" + fileName).getFile();
        return com.mchange.io.FileUtils.getContentsAsString(res);
    }

    /**
     * Mapped method to delete a submission from the queue.
     *
     * @param authentication - the user
     * @param data - RejectData
     * @throws Exception - failed
     */
    @PostMapping(path = "/reject", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void rejectSubmission(final Authentication authentication,
                                 final @RequestBody RejectData data) throws Exception {
        isAdministrator(authentication);
        val path = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/" + data.getId());
        val service = CasManagementUtils.fromJson(path.toFile());
        val contact = getSubmitter(path)[0];
        Files.delete(path);
        sendRejectMessage(service.getName(), data.getNote(),
                 contact, data.getId().contains("edit"));
    }

    private void sendRejectMessage(final String submitName, final String note, final String email, final boolean isChange) {
        if (communicationsManager.isMailSenderDefined()) {
            val notifications = managementProperties.getSubmissions().getNotifications();
            val emailProps = isChange ? notifications.getRejectChange() : notifications.getReject();
            emailProps.setSubject(MessageFormat.format(emailProps.getSubject(), submitName));
            communicationsManager.email(emailProps, email, MessageFormat.format(emailProps.getText(), submitName, note));
        }
    }

    /**
     * Mapped method to delete a submission from the queue.
     *
     * @param authentication - the user
     * @param id - file name of the service
     * @throws Exception - failed
     */
    @PostMapping("added")
    @ResponseStatus(HttpStatus.OK)
    public void addedSubmission(final Authentication authentication,
                                final @RequestBody String id) throws Exception {
        isAdministrator(authentication);
        val path = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/" + id);
        val service = CasManagementUtils.fromJson(path.toFile());
        val contact = getSubmitter(path)[0];
        Files.delete(path);
        sendAddedMessage(service.getName(), StringUtils.EMPTY, contact);
    }

    private void sendAddedMessage(final String submitName, final String note, final String email) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getSubmissions().getNotifications().getAdded();
            emailProps.setSubject(MessageFormat.format(emailProps.getSubject(), submitName));
            communicationsManager.email(emailProps, email, MessageFormat.format(emailProps.getText(), submitName, note));
        }
    }
    /**
     * Mapped method that will return a diff of the submission and the current version in the repo.
     *
     * @param authentication - the user
     * @param response - the response
     * @param id - the file name of the submission
     * @throws Exception - failed
     */
    @PostMapping("diff")
    @ResponseStatus(HttpStatus.OK)
    public void diffSubmission(final Authentication authentication,
                               final HttpServletResponse response,
                               final @RequestBody String id) throws Exception {
        isAdministrator(authentication);
        val git = repositoryFactory.masterRepository();
        val subPath = new RawText(FileUtils.readFileToByteArray(
                new File(managementProperties.getSubmissions().getSubmitDir() + "/" + id)));
        val splitSub = Splitter.on("-").splitToList(id);
        val gitPath = new RawText(FileUtils.readFileToByteArray(
                new File(managementProperties.getVersionControl().getServicesRepo() + "/service-" + splitSub.get(1))));
        response.getOutputStream().write(git.getFormatter(gitPath, subPath));
    }

    /**
     * Mapped method to accept submissions.
     *
     * @param authentication - the user
     * @param id - the file name of the submission
     * @throws Exception - failed
     */
    @PostMapping("accept")
    @ResponseStatus(HttpStatus.OK)
    public void acceptSubmission(final Authentication authentication,
                                 final @RequestBody String id) throws Exception {
        isAdministrator(authentication);
        val manager = managerFactory.from(authentication);
        val path = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/" + id);
        val service = CasManagementUtils.fromJson(path.toFile());
        manager.save(service);
        val contact = getSubmitter(path)[0];
        Files.delete(path);
        sendAcceptMessage(service.getName(), contact);
    }

    private void sendAcceptMessage(final String submitName, final String email) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getSubmissions().getNotifications().getAccept();
            emailProps.setSubject(MessageFormat.format(emailProps.getSubject(), submitName));
            communicationsManager.email(emailProps, email, MessageFormat.format(emailProps.getText(), submitName));
        }
    }

    /**
     * Mapped method to accept removal of service submissions.
     *
     * @param authentication - the user
     * @param id - the file name of the submission
     * @throws Exception - failed
     */
    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void deleteSubmission(final Authentication authentication,
                                 final @RequestParam String id) throws Exception {
        isAdministrator(authentication);
        val manager = managerFactory.from(authentication);
        val path = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/" + id);
        val service = CasManagementUtils.fromJson(path.toFile());
        val contact = getSubmitter(path)[0];
        manager.delete(service.getId());
        Files.delete(path);
        sendDeleteMessage(service.getName(), contact);
    }

    private void sendDeleteMessage(final String submitName, final String email) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getSubmissions().getNotifications().getDelete();
            emailProps.setSubject(MessageFormat.format(emailProps.getSubject(), submitName));
            communicationsManager.email(emailProps, email, MessageFormat.format(emailProps.getText(), submitName));
        }
    }

    /**
     * Returns submitted service file as {@link RegisteredService}.
     *
     * @param id - the assigned id
     * @return - RegisteredService
     * @throws Exception -failed
     */
    @PostMapping("import")
    public RegisteredService importSubmission(final @RequestBody String id) throws Exception {
        return CasManagementUtils.fromJson(
                new File(managementProperties.getSubmissions().getSubmitDir() + "/" + id));
    }

    private String[] getSubmitter(final Path path) {
        try {
            val email = new byte[MAX_EMAIL_LENGTH];
            Files.getFileAttributeView(path, UserDefinedFileAttributeView.class)
                    .read("original_author", ByteBuffer.wrap(email));
            return new String(email, StandardCharsets.UTF_8).trim().split(":");
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new String[] {StringUtils.EMPTY, StringUtils.EMPTY};
        }
    }

    private String getSubmitted(final Path path) {
        try {
            return LocalDateTime.ofInstant(Files.getLastModifiedTime(path).toInstant(), ZoneOffset.systemDefault()).toString();
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return StringUtils.EMPTY;
        }
    }

    private HttpResponse fetchMetadata(final String metadataLocation) {
        val metadata = casProperties.getAuthn().getSamlIdp().getMetadata();
        val headers = new LinkedHashMap<String, Object>();
        headers.put("Content-Type", metadata.getSupportedContentTypes());
        headers.put("Accept", "*/*");

        LOGGER.debug("Fetching dynamic metadata via MDQ for [{}]", metadataLocation);
        val response = HttpUtils.executeGet(metadataLocation, metadata.getBasicAuthnUsername(),
                casProperties.getAuthn().getSamlIdp().getMetadata().getBasicAuthnPassword(), new HashMap<>(), headers);
        if (response == null) {
            LOGGER.error("Unable to fetch metadata from [{}]", metadataLocation);
            throw new UnauthorizedServiceException(UnauthorizedServiceException.CODE_UNAUTHZ_SERVICE);
        }
        return response;
    }
}
