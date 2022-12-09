package org.apereo.cas.mgmt;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.notifications.CommunicationsManager;
import org.apereo.cas.notifications.mail.EmailMessageRequest;
import org.apereo.cas.services.RegisteredServiceContact;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

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

    private final VersionControlManagerFactory managerFactory;

    private final CasManagementConfigurationProperties managementProperties;

    private final RepositoryFactory repositoryFactory;

    private final CommunicationsManager communicationsManager;

    /**
     * Method used to remove the logged in user as contact from multiple services.
     *
     * @param authentication - the user
     * @param services       - Array of service IDs
     * @throws IllegalAccessException - Does not own service
     * @throws IllegalStateException  - Service requires at least one contact
     */
    @PostMapping("unclaim")
    @ResponseStatus(HttpStatus.OK)
    public void bulkUnclaim(final Authentication authentication,
                            @RequestBody final String[] services) throws IllegalStateException, IllegalAccessException {
        val casUserProfile = CasUserProfile.from(authentication);
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
                throw new IllegalStateException("You are the only contact for service: '" + service.getName()
                                                + "'.  A second contact must be added before you can remove yourself.");
            }
        }
        if (git.scanWorkingDiffs().isEmpty()) {
            git.close();
            removeClone(clone);
            throw new IllegalAccessException("You are not listed as a contact on any of the selected services. No change has been submitted.");
        }
        commitBranch(git, casUserProfile, "bulk-remove", "Bulk Remove for " + fullName(casUserProfile));
        removeClone(clone);
        sendBulkRemoveMessage(getServiceNames(services, manager), casUserProfile);
    }

    private void sendBulkRemoveMessage(final String services, final CasUserProfile user) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getRegister().getBulkNotifications().getRemove();
            val request = EmailMessageRequest.builder()
                .body(MessageFormat.format(emailProps.getText(), services))
                .to(List.of(user.getEmail())).build();
            communicationsManager.email(request);
        }
    }

    /**
     * Method will add the logged in user as contact to multiple services.
     *
     * @param authentication - the user
     * @param services       - Array of Service IDs
     * @throws IllegalStateException - failed
     */
    @PostMapping("claim")
    @ResponseStatus(HttpStatus.OK)
    public void bulkclaim(final Authentication authentication,
                          @RequestBody final String[] services) throws IllegalStateException {
        val casUserProfile = CasUserProfile.from(authentication);
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
            throw new IllegalStateException("No services were submitted that you could be added to.");
        }
        commitBranch(git, casUserProfile, "bulk-add", "Bulk Add for " + fullName(casUserProfile));
        removeClone(clone);
        sendBulkAddMessage(getServiceNames(services, manager), casUserProfile);
    }

    private void sendBulkAddMessage(final String services, final CasUserProfile user) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getRegister().getBulkNotifications().getAdd();
            val request = EmailMessageRequest.builder()
                .body(MessageFormat.format(emailProps.getText(), services))
                .to(List.of(user.getEmail())).build();
            communicationsManager.email(request);
        }
    }

    private static void commitBranch(final GitUtil git, final CasUserProfile casUserProfile,
                                     final String op, final String msg) {
        try {
            val timestamp = new Date().getTime();
            val branchName = op + '-' + casUserProfile.getEmail() + '-' + timestamp;
            git.addWorkingChanges();
            val commit = git.commit(casUserProfile, msg);
            git.createBranch(branchName, "origin/master");
            git.cherryPickCommit(commit);
            git.commit(casUserProfile, msg);
            val submitName = casUserProfile.getId() + '_' + timestamp;
            git.createPullRequest(commit, submitName);
            git.checkout("master");
            git.close();
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    private static void removeClone(final String clone) {
        try {
            Runtime.getRuntime().exec("rm -rf " + clone).waitFor();
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    private static String getServiceNames(final String[] services, final ManagementServicesManager manager) {
        val sb = new StringBuilder();
        Arrays.stream(services).forEach(s -> sb.append('\t').append(manager.findServiceBy(Long.parseLong(s)).getName()).append('\n'));
        return sb.toString();
    }

    private static String fullName(final CasUserProfile casUserProfile) {
        return casUserProfile.getFirstName() + ' ' + casUserProfile.getFamilyName();
    }

    private static RegisteredServiceContact owner(final List<RegisteredServiceContact> contacts, final String email) {
        return contacts.stream().filter(c -> email.equalsIgnoreCase(c.getEmail())).findAny().orElse(null);
    }
}
