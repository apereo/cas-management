package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.RegisterNotifications;
import org.apereo.cas.configuration.model.support.email.EmailProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.domain.LookupServiceItem;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.RegexRegisteredService;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.RegisteredServiceContact;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.util.DigestUtils;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.UserDefinedFileAttributeView;
import java.text.MessageFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Base Controller for handling requests from Staff and Faculty.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RequiredArgsConstructor
@Slf4j
public abstract class BaseRegisterController {

    private static final int MAX_EMAIL_LENGTH = 100;

    /**
     * User Profile Factory.
     */
    protected final CasUserProfileFactory casUserProfileFactory;

    /**
     * Manager Factory.
     */
    protected final MgmtManagerFactory managerFactory;

    /**
     * Management Configuration properties.
     */
    protected final CasManagementConfigurationProperties managementProperties;

    /**
     * EMail Manager.
     */
    protected final EmailManager communicationsManager;

    /**
     * Services Manager.
     */
    protected final ServicesManager published;

    /**
     * Notifications Text.
     */
    protected final RegisterNotifications notifications;

    /**
     * Mapped method that accepts a submitted service by end user and adds is to Submissions queue.
     *
     * @param response - the response
     * @param request - the request
     * @param service - the Service to be submitted
     * @throws Exception - failed
     */
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void submit(final HttpServletResponse response,
                       final HttpServletRequest request,
                       final @RequestBody RegisteredService service) throws Exception {
        val id = service.getId() > 0 ? service.getId() : new Date().getTime();
        val path = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/submit-" + id +".json");
        val out = Files.newOutputStream(path);
        CasManagementUtils.jsonTo(out, service);
        out.close();
        val casUserProfile = casUserProfileFactory.from(request, response);
        setSubmitter(path, casUserProfile);
        sendMessage(casUserProfile, notifications.getSubmit(), service.getName(), service.getName());
    }

    /**
     * Mapped method to handle updating a service submitted by a user.
     *
     * @param response - the response
     * @param request - the request
     * @param pair - the Service to update
     * @throws Exception - failed
     */
    @PatchMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void registerSave(final HttpServletResponse response,
                             final HttpServletRequest request,
                             final @RequestBody DataPair pair) throws Exception {
        val service = pair.getRight();
        val id = pair.getLeft();
        val casUserProfile = casUserProfileFactory.from(request, response);
        saveService(service, id, casUserProfile);
    }

    /**
     * Request to delete a service.
     *
     * @param request - the request
     * @param response - the response
     * @param id - the id
     * @throws Exception -failed
     */
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(final HttpServletRequest request,
                       final HttpServletResponse response,
                       final @PathVariable String id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.master();
        val service = manager.findServiceBy(Long.parseLong(id));
        val path = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/remove-" + service.getId() + ".json");
        val out = Files.newOutputStream(path);
        CasManagementUtils.jsonTo(out, service);
        out.close();
        setSubmitter(path, casUserProfile);
        sendMessage(casUserProfile, notifications.getRemove(), service.getName(), service.getName());
    }

    /**
     * Mapped method that returns the RegisteredService by the passed Id form the master repo.
     *
     * @param response - the response
     * @param request - the request
     * @param id - assigned id of the service
     * @return - the requested RegisteredService
     * @throws Exception - failed
     */
    @GetMapping("{id}")
    public RegisteredService getRegisterService(final HttpServletResponse response,
                                                final HttpServletRequest request,
                                                final @PathVariable String id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val email = casUserProfile.getEmail();
        val manager = managerFactory.master();
        val svc = manager.findServiceBy(Long.parseLong(id));
        checkOwner(svc.getContacts(), email);
        return svc;
    }

    /**
     * Method will cancel a pending submission.
     *
     * @param response - the response
     * @param request - the request
     * @param id - id of pending submission
     * @throws Exception - failed
     */
    @DeleteMapping("cancel")
    @ResponseStatus(HttpStatus.OK)
    public void cancel(final HttpServletResponse response,
                       final HttpServletRequest request,
                       final @RequestParam String id) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val service = Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/" + id);
        if (!isSubmitter(service, casUserProfile)) {
            throw new Exception("You are not the original submitter of the request");
        }
        Files.delete(service);
    }

    /**
     * Submits a request to promote a service.
     *
     * @param id - the id
     * @param request - the request
     * @param response - the response
     * @throws Exception - failed
     */
    @GetMapping("promote/{id}")
    public void promote(final @PathVariable Long id,
                        final HttpServletRequest request,
                        final HttpServletResponse response) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val manager = managerFactory.master();
        val service = manager.findServiceBy(id);
        ((RegexRegisteredService) service).setEnvironments(null);
        saveService(service, String.valueOf(id), casUserProfile);
    }

    private boolean isSubmitter(final Path p, final CasUserProfile casUserProfile) {
        return getSubmitter(p)[0].equals(casUserProfile.getEmail());
    }

    private String[] getSubmitter(final Path path) {
        try {
            val email = new byte[MAX_EMAIL_LENGTH];
            Files.getFileAttributeView(path, UserDefinedFileAttributeView.class)
                    .read("original_author", ByteBuffer.wrap(email));
            return new String(email).trim().split(":");
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return new String[] {"", ""};
        }
    }

    private void sendMessage(final CasUserProfile user,
                             final EmailProperties emailProperties,
                             final String textArg,
                             final String subjectArg) {
        if (communicationsManager.isMailSenderDefined()) {
            communicationsManager.email(
                    MessageFormat.format(emailProperties.getText(), textArg),
                    emailProperties.getFrom(),
                    MessageFormat.format(emailProperties.getSubject(), subjectArg),
                    user.getEmail(),
                    emailProperties.getCc(),
                    emailProperties.getBcc());
        }
    }

    /**
     * Saves a submitted service.
     *
     * @param service - the service
     * @param id - the id of the service
     * @param casUserProfile - user profile
     * @throws Exception - failed
     */
    protected void saveService(final RegisteredService service, final String id, final CasUserProfile casUserProfile) throws Exception {
        val serializer = new DefaultRegisteredServiceJsonSerializer();
        val path = isNumber(id) ? Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/edit-" + service.getId() + ".json")
                : Paths.get(managementProperties.getSubmissions().getSubmitDir() + "/" + id);
        val out = Files.newOutputStream(path);
        serializer.to(out, service);
        out.close();
        setSubmitter(path, casUserProfile);
        sendMessage(casUserProfile, notifications.getChange(), service.getName(), service.getName());
    }

    /**
     * Creates a Service Line Item from the passed service.
     *
     * @param service - the service
     * @return - LookupServiceItem
     */
    protected LookupServiceItem createServiceItem(final RegisteredService service) {
        val serviceItem = new LookupServiceItem();
        serviceItem.setAssignedId(String.valueOf(service.getId()));
        serviceItem.setName(service.getName());
        serviceItem.setServiceId(service.getServiceId());
        serviceItem.setDescription(DigestUtils.abbreviate(service.getDescription()));
        serviceItem.setContacts(names(service.getContacts().stream()));
        return serviceItem;
    }

    /**
     * Returns the contact if the passed email is an owner of the service or null.
     *
     * @param contacts - List of contacts for a service.
     * @param email - Email to search for
     * @return - RegisteredServiceContact or null
     */
    protected RegisteredServiceContact owner(final List<RegisteredServiceContact> contacts, final String email) {
        return contacts.stream().filter(c -> email.equalsIgnoreCase(c.getEmail())).findAny().orElse(null);
    }

    private void checkOwner(final List<RegisteredServiceContact> contacts, final String email) throws Exception {
        if (owner(contacts, email) == null) {
            throw new IllegalAccessException("You do not own this service.");
        }
    }

    private String names(final Stream<RegisteredServiceContact> stream) {
        return stream
                .map(s -> s.getName() != null ? s.getName() : s.getEmail())
                .collect(Collectors.joining(", "));
    }

    private void setSubmitter(final Path path, final CasUserProfile casUserProfile) throws Exception {
        val payload = casUserProfile.getEmail() + ":" + casUserProfile.getFirstName() + " "
                + casUserProfile.getFamilyName();
        Files.getFileAttributeView(path, UserDefinedFileAttributeView.class)
                .write("original_author", ByteBuffer.wrap(payload.getBytes()));
    }

    private boolean isNumber(final String id) {
        try {
            Long.parseLong(id);
            return true;
        } catch (final Exception e) {
            return false;
        }
    }

    @Data
    private static class DataPair {
        private String left;
        private RegisteredService right;
    }
}
