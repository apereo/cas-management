package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.BranchData;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.util.io.CommunicationsManager;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
 * Controller to handle submit requests.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("submitController")
@RequestMapping(path = "api/submit", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class SubmitController {

    private final RepositoryFactory repositoryFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final CommunicationsManager communicationsManager;

    /**
     * Method commits the working dir of the user and creates a submit branch that is made into a pull request.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @param msg      - message from user
     */
    @PostMapping
    @SneakyThrows
    public void submitPull(final HttpServletResponse response,
                           final HttpServletRequest request,
                           final @RequestBody String msg) {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.from(user)) {
            if (git.isUndefined()) {
                throw new IllegalArgumentException("No changes to submit");
            }
            val timestamp = new Date().getTime();
            val branchName = "submit-" + timestamp;
            val submitName = user.getId() + '_' + timestamp;

            git.addWorkingChanges();
            val commit = git.commit(user, msg);
            git.createBranch(branchName, "origin/master");
            git.cherryPickCommit(commit);
            git.commit(user, msg);
            git.createPullRequest(commit, submitName);
            git.checkout("master");
            sendSubmitMessage(submitName, user);
        }
    }

    private void sendSubmitMessage(final String submitName, final CasUserProfile user) {
        if (communicationsManager.isMailSenderDefined()) {
            val emailProps = managementProperties.getDelegated().getNotifications().getSubmit();
            communicationsManager.email(
                    emailProps.getText(),
                    emailProps.getFrom(),
                    MessageFormat.format(emailProps.getSubject(), submitName),
                    user.getEmail(),
                    emailProps.getCc(),
                    emailProps.getBcc());
        }
    }

    /**
     * Method will create and return a list of branches that have been submitted as pull request by users.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - List of BranchData
     */
    @GetMapping
    @SneakyThrows
    public List<BranchData> submits(final HttpServletRequest request,
                                    final HttpServletResponse response) {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.branches()
                    .filter(r -> r.getName().contains('/' + user.getId() + '_'))
                    .map(git::mapBranches)
                    .map(DelegatedUtil::createBranch)
                    .collect(toList());
        }
    }

    /**
     * Method will revert a submitted pull request from a user's repository if it has been rejected by an admin.
     *
     * @param request    - HttpServletRequest
     * @param response   - HttpServletResponse
     * @param branchName - Name of the pull requet
     */
    @GetMapping("revert/{bracnch}")
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public void revertSubmit(final HttpServletRequest request,
                             final HttpServletResponse response,
                             final @PathVariable String branchName) {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.from(user)) {
            if (git.isUndefined()) {
                throw new IllegalArgumentException("No changes to revert");
            }
            git.reset(git.findCommitBeforeSubmit(branchName));
        }
        try (GitUtil master = repositoryFactory.masterRepository()) {
            master.markAsReverted(branchName, user);
        }
    }
}
