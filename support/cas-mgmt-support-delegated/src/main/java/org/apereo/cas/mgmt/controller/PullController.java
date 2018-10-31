package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.BranchActionData;
import org.apereo.cas.mgmt.domain.BranchData;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.util.io.CommunicationsManager;

import com.google.common.base.Splitter;
import com.google.common.collect.Iterables;
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
import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * Controller to handle pull requests.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("pullController")
@RequestMapping(path = "api/pull", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class PullController extends AbstractVersionControlController {

    private final RepositoryFactory repositoryFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final CommunicationsManager communicationsManager;

    public PullController(final RepositoryFactory repositoryFactory,
                               final CasUserProfileFactory casUserProfileFactory,
                               final CasManagementConfigurationProperties managementProperties,
                               final CommunicationsManager communicationsManager) {
        super(casUserProfileFactory);
        this.repositoryFactory = repositoryFactory;
        this.managementProperties = managementProperties;
        this.communicationsManager = communicationsManager;
    }

    /**
     * Method will create a list of branches that have been submitted by users to be merged into the services-repo.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpsServletRequest
     * @param options  - List of Branch statuses filter the returned branches by
     * @return - List of BranchData
     * @throws Exception - failed
     */
    @PostMapping
    public List<BranchData> branches(final HttpServletResponse response,
                                     final HttpServletRequest request,
                                     final @RequestBody boolean[] options) throws Exception {
        isAdministrator(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.branches()
                    .map(git::mapBranches)
                    .filter(r -> DelegatedUtil.filterPulls(r, options))
                    .map(DelegatedUtil::createBranch)
                    .collect(toList());
        }
    }

    /**
     * Method will merge the submitted pull request into the services-repo.
     *
     * @param request   - HttpServletRequest
     * @param response  - HttpServletResponse
     * @param acception - BranchActionData
     * @throws Exception - failed
     */
    @PostMapping(value = "/accept", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void acceptChange(final HttpServletRequest request,
                             final HttpServletResponse response,
                             final @RequestBody BranchActionData acception) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        isAdministrator(user);
        val branch = acception.getBranch();
        val text = acception.getNote();
        try (GitUtil git = repositoryFactory.masterRepository()) {
            git.merge(branch.getId());
            val com = git.getCommit(branch.getId());
            val msg = "ACCEPTED by " + user.getId() + " on " + new Date().toString() + "\n    "
                    + text.replaceAll("\\n", "\n    ");
            git.appendNote(com, msg);
            sendAcceptMessage(Iterables.get(Splitter.on('/').split(branch.getName()), 2), com.getCommitterIdent().getEmailAddress());
        }
    }

    private void sendAcceptMessage(final String submitName, final String email) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getDelegated().getNotifications().getAccept();
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

    /**
     * Method will mark the submitted pull request as being rejected by an admin.
     *
     * @param request   - HttpServletRequest
     * @param response  - HttpServletResponse
     * @param rejection - BranchActionData
     * @throws Exception - failed
     */
    @PostMapping(value = "/reject", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void rejectChange(final HttpServletRequest request,
                             final HttpServletResponse response,
                             final @RequestBody BranchActionData rejection) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        isAdministrator(user);
        val branch = rejection.getBranch();
        val text = rejection.getNote();
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val com = git.getCommit(branch.getId());
            val msg = "REJECTED by " + user.getId() + " on " + new Date().toString() + "\n    "
                    + text.replaceAll("\\n", "\n    ");
            git.appendNote(com, msg);

            sendRejectMessage(Iterables.get(Splitter.on('/').split(branch.getName()), 2), text, com.getCommitterIdent().getEmailAddress());
        }
    }

    private void sendRejectMessage(final String submitName, final String note, final String email) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getDelegated().getNotifications().getReject();
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
}
