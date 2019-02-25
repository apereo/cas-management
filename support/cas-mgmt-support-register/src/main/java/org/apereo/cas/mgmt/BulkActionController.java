package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.domain.PassedContact;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.services.RegisteredServiceContact;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Controller for bulk operations.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("bulkController")
@RequestMapping(path = "api/bulk", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class BulkActionController {

    private final CasUserProfileFactory casUserProfileFactory;
    private final VersionControlManagerFactory managerFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final RepositoryFactory repositoryFactory;
    private final EmailManager communicationsManager;

    /**
     * Method used to remove the logged in user as contact from multiple services.
     *
     * @param response - HttpServletResponse
     * @param request - HttpServletRequest
     * @param services - Arrayu of service IDs
     * @throws Exception - failed
     */
    @PostMapping("unclaim")
    @ResponseStatus(HttpStatus.OK)
    public void bulkUnclaim(final HttpServletResponse response,
                            final HttpServletRequest request,
                            final @RequestBody String[] services) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val email = casUserProfile.getEmail();
        val timestamp = new Date().getTime();
        val clone = managementProperties.getDelegated().getUserReposDir() + "/bulk-" + timestamp;
        val git = repositoryFactory.clone(clone);
        val manager = managerFactory.from(git);
        for (val id : services) {
            val service = manager.findServiceBy(Long.parseLong(id));
            val contact = owner(service.getContacts(), email);
            if (contact != null) {
                service.getContacts().remove(contact);
            }
            if (service.getContacts().size() > 0) {
                manager.save(service);
            } else {
                git.close();
                removeClone(clone);
                throw new Exception("You are the only contact for service: '" + service.getName()
                        + "'.  A second contact must be added before you can remove yourself.");
            }
        }
        if (git.scanWorkingDiffs().isEmpty()) {
            git.close();
            removeClone(clone);
            throw new Exception("You are not listed as a contact on any of the selected services. No change has been submitted.");
        }
        commitBranch(git, casUserProfile, "bulk-remove", "Bulk Remove for " + fullName(casUserProfile));
        removeClone(clone);
        sendBulkRemoveMessage(getServiceNames(services, manager), casUserProfile);
    }

    private void sendBulkRemoveMessage(final String services, final CasUserProfile user) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getRegister().getBulkNotifications().getRemove();
            communicationsManager.email(
                    MessageFormat.format(emailProps.getText(), services),
                    emailProps.getFrom(),
                    emailProps.getSubject(),
                    user.getEmail(),
                    emailProps.getCc(),
                    emailProps.getBcc());
        }
    }

    /**
     * Method will add the logged in user as contact to multiple services.
     *
     * @param response - HttpServletResponse
     * @param request - HttpServletRequest
     * @param services - Array of Service IDs
     * @throws Exception - failed
     */
    @PostMapping("claim")
    @ResponseStatus(HttpStatus.OK)
    public void bulkclaim(final HttpServletResponse response,
                          final HttpServletRequest request,
                          final @RequestBody String[] services) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val email = casUserProfile.getEmail();
        val timestamp = new Date().getTime();
        val clone = managementProperties.getDelegated().getUserReposDir() + "/bulk-" + timestamp;
        val git = repositoryFactory.clone(clone);
        val manager = managerFactory.from(git);
        val contact = RegisterUtil.createContact(casUserProfile);
        for (val id : services) {
            val service = manager.findServiceBy(Long.parseLong(id));
            val owner = owner(service.getContacts(), email);
            if (owner == null) {
                service.getContacts().add(contact);
            } else {
                val index = service.getContacts().indexOf(owner);
                service.getContacts().remove(owner);
                service.getContacts().add(index, contact);
            }
            manager.save(service);
        }
        if (git.scanWorkingDiffs().isEmpty()) {
            git.close();
            removeClone(clone);
            throw new Exception("No services were submitted that you could be added to.");
        }
        commitBranch(git, casUserProfile, "bulk-add", "Bulk Add for " + fullName(casUserProfile));
        removeClone(clone);
        sendBulkAddMessage(getServiceNames(services, manager), casUserProfile);
    }

    private void sendBulkAddMessage(final String services, final CasUserProfile user) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getRegister().getBulkNotifications().getAdd();
            communicationsManager.email(
                    MessageFormat.format(emailProps.getText(), services),
                    emailProps.getFrom(),
                    emailProps.getSubject(),
                    user.getEmail(),
                    emailProps.getCc(),
                    emailProps.getBcc());
        }
    }

    /**
     * Method will remove a specific contact from multiple services.
     *
     * @param response - HttpServletResponse
     * @param request - HttpServletRequest
     * @param removeContact - Contact to be removed
     * @throws Exception - failed
     */
    @PostMapping("remove")
    @ResponseStatus(HttpStatus.OK)
    public void bulkRemove(final HttpServletResponse response,
                           final HttpServletRequest request,
                           final @RequestBody PassedContact removeContact) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val removal = removeContact.getContact();
        val services = removeContact.getServices();
        val timestamp = new Date().getTime();
        val clone = managementProperties.getDelegated().getUserReposDir() + "/bulk-" + timestamp;
        val git = repositoryFactory.clone(clone);
        val manager = managerFactory.from(git);
        for (val id : services) {
            val service = manager.findServiceBy(Long.parseLong(id));
            val contact = owner(service.getContacts(), removal.getEmail());
            if (contact != null) {
                service.getContacts().remove(contact);
            }
            if (service.getContacts().size() > 0) {
                manager.save(service);
            }
        }
        if (git.scanWorkingDiffs().isEmpty()) {
            git.close();
            removeClone(clone);
            throw new Exception("You don't own any of the submitted services");
        }
        commitBranch(git, casUserProfile, "bulk-remove", "Bulk Removal of " + fullName(casUserProfile));
        removeClone(clone);
        sendBulkRemoveContactMessage(getServiceNames(services, manager), casUserProfile, removal.getName());
    }

    private void sendBulkRemoveContactMessage(final String services, final CasUserProfile user, final String removal) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getRegister().getBulkNotifications().getRemoveContact();
            communicationsManager.email(
                    MessageFormat.format(emailProps.getText(), removal, services),
                    emailProps.getFrom(),
                    MessageFormat.format(emailProps.getSubject(), removal),
                    user.getEmail(),
                    emailProps.getCc(),
                    emailProps.getBcc());
        }
    }

    /**
     * Method will add the passed contact to all passed services.
     *
     * @param response - HttpServletResponse
     * @param request - HttpServletRequest
     * @param addContact - Contact to be added
     * @throws Exception - failed
     */
    @PostMapping("add")
    @ResponseStatus(HttpStatus.OK)
    public void bulkAdd(final HttpServletResponse response,
                        final HttpServletRequest request,
                        final @RequestBody PassedContact addContact) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        val adds = addContact.getContacts();
        val services = addContact.getServices();
        val timestamp = new Date().getTime();
        val clone = managementProperties.getDelegated().getUserReposDir() + "/bulk-" + timestamp;
        val git = repositoryFactory.clone(clone);
        val manager = managerFactory.from(git);
        for (val id : services) {
            val service = manager.findServiceBy(Long.parseLong(id));
            for (val add : adds) {
                val contact = owner(service.getContacts(), add.getEmail());
                if (contact == null) {
                    service.getContacts().add(add);
                    manager.save(service);
                }
            }
        }
        if (git.scanWorkingDiffs().isEmpty()) {
            git.close();
            removeClone(clone);
            throw new Exception("Contact already on all services");
        }
        val names = names(Arrays.stream(adds));
        commitBranch(git, casUserProfile, "bulk-add", "Bulk Add of " + names + " by " + fullName(casUserProfile));
        removeClone(clone);
        sendBulkAddContactMessage(getServiceNames(services, manager), casUserProfile, names);
    }


    private void sendBulkAddContactMessage(final String services, final CasUserProfile user, final String removal) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getRegister().getBulkNotifications().getAddContact();
            communicationsManager.email(
                    MessageFormat.format(emailProps.getText(), removal, services),
                    emailProps.getFrom(),
                    MessageFormat.format(emailProps.getSubject(), removal),
                    user.getEmail(),
                    emailProps.getCc(),
                    emailProps.getBcc());
        }
    }

    private void commitBranch(final GitUtil git, final CasUserProfile casUserProfile, final String op, final String msg) {
        try {
            val timestamp = new Date().getTime();
            val branchName = op + "-" + casUserProfile.getEmail() + "-" + timestamp;
            git.addWorkingChanges();
            val commit = git.commit(casUserProfile, msg);
            git.createBranch(branchName, "origin/master");
            git.cherryPickCommit(commit);
            git.commit(casUserProfile, msg);
            val submitName = casUserProfile.getId() + "_" + timestamp;
            git.createPullRequest(commit, submitName);
            git.checkout("master");
            git.close();
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    private void removeClone(final String clone) {
        try {
            Runtime.getRuntime().exec("rm -rf " + clone).waitFor();
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    private String getServiceNames(final String[] services, final ManagementServicesManager manager) {
        val sb = new StringBuilder();
        Arrays.stream(services).forEach(s -> sb.append("\t" + manager.findServiceBy(Long.parseLong(s)).getName() + "\n"));
        return sb.toString();
    }

    private String fullName(final CasUserProfile casUserProfile) {
        return casUserProfile.getFirstName() + " " + casUserProfile.getFamilyName();
    }

    private RegisteredServiceContact owner(final List<RegisteredServiceContact> contacts, final String email) {
        return contacts.stream().filter(c -> email.equalsIgnoreCase(c.getEmail())).findAny().orElse(null);
    }

    private String names(final Stream<RegisteredServiceContact> stream) {
        return stream
                .map(s -> s.getName() != null ? s.getName() : s.getEmail())
                .collect(Collectors.joining(", "));
    }

}
