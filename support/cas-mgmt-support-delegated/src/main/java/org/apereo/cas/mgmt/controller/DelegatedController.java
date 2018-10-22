package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.BranchActionData;
import org.apereo.cas.mgmt.domain.BranchData;
import org.apereo.cas.mgmt.domain.CNote;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.util.io.CommunicationsManager;

import com.google.common.base.Splitter;
import com.google.common.collect.Iterables;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.MessageFormat;
import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * The delegated controller.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("mgmtDelegatedController")
@RequestMapping(path = "/delegated", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
@RequiredArgsConstructor
public class DelegatedController {

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
     * @throws Exception - failed.
     */
    @PostMapping(value = "/submit", consumes = MediaType.TEXT_PLAIN_VALUE)
    public void submitPull(final HttpServletResponse response,
                           final HttpServletRequest request,
                           @RequestBody final String msg) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.from(user)) {
            if (git.isUndefined()) {
                throw new Exception("No changes to submit");
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
     * Method will create a list of branches that have been submitted by users to be merged into the services-repo.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpsServletRequest
     * @param options  - List of Branch statuses filter the returned branches by
     * @return - List of BranchData
     * @throws Exception - failed
     */
    @PostMapping(value = "pullRequests", consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<BranchData> branches(final HttpServletResponse response,
                                     final HttpServletRequest request,
                                     final @RequestBody boolean[] options) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }
        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.branches()
                    .map(git::mapBranches)
                    .filter(r -> filterPulls(r, options))
                    .map(DelegatedController::createBranch)
                    .collect(toList());
        }
    }

    /**
     * Method will filter refs to only the statuses on Options.
     *
     * @param r       - BranchMap
     * @param options - 0:Submitted, 1:Accepted, 2:Rejected
     * @return - true of the pull should be included
     */
    private static boolean filterPulls(final GitUtil.BranchMap r, final boolean[] options) {
        if (r.getName().equals("refs/heads/master")) {
            return false;
        }
        if (r.isAccepted()) {
            return options[1];
        }
        if (r.isRejected()) {
            return options[2];
        }
        return options[0];
    }

    /**
     * Method will create and return a list of branches that have been submitted as pull request by users.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - List of BranchData
     * @throws Exception - failed
     */
    @GetMapping(value = "submitRequests")
    public List<BranchData> submits(final HttpServletRequest request,
                                    final HttpServletResponse response) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.branches()
                    .filter(r -> r.getName().contains('/' + user.getId() + '_'))
                    .map(git::mapBranches)
                    .map(DelegatedController::createBranch)
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
    @PostMapping(value = "/acceptBranch", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void acceptChange(final HttpServletRequest request,
                             final HttpServletResponse response,
                             final @RequestBody BranchActionData acception) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }
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
    @PostMapping(value = "/rejectBranch", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void rejectChange(final HttpServletRequest request,
                             final HttpServletResponse response,
                             final @RequestBody BranchActionData rejection) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }
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

    /**
     * Method will return all notes that have been added to a submit request.
     *
     * @param response - HttpServletResponse
     * @param id       - id of note
     * @throws Exception - failed
     */
    @GetMapping("notes")
    public void getNotes(final HttpServletResponse response, final @RequestParam String id) throws Exception {
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val note = git.note(id);
            if (note != null) {
                git.writeNote(note, response.getOutputStream());
            }
        }
    }

    /**
     * Method will add the supplied note from the client to the submit request in the repo.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param cnote    - CNote
     * @throws Exception - failed
     */
    @PostMapping(value = "/addNote", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void addNote(final HttpServletRequest request,
                        final HttpServletResponse response,
                        final @RequestBody CNote cnote) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val com = git.getCommit(cnote.getId());
            val msg = user.getId() + " - " + new Date().toString() + " : \n    "
                    + cnote.getText().replaceAll("\\n", "\n    ");
            git.appendNote(com, msg);
        }
    }

    /**
     * Method will revert a submitted pull request from a user's repository if it has been rejected by an admin.
     *
     * @param request    - HttpServletRequest
     * @param response   - HttpServletResponse
     * @param branchName - Name of the pull requet
     * @throws Exception - failed
     */
    @GetMapping("revertSubmit")
    @ResponseStatus(HttpStatus.OK)
    public void revertSubmit(final HttpServletRequest request,
                             final HttpServletResponse response,
                             @RequestParam final String branchName) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.from(user)) {
            if (git.isUndefined()) {
                throw new Exception("No changes to revert");
            }

            git.reset(git.findCommitBeforeSubmit(branchName));
        }
        try (GitUtil master = repositoryFactory.masterRepository()) {
            master.markAsReverted(branchName, user);
        }
    }

    /**
     * Returns text of notifications of a pull request that is pending.
     *
     * @param request  - the request.
     * @param response - the response.
     * @return - String representing notification.
     * @throws Exception - failed.
     */
    @GetMapping("notifications")
    public String notifications(final HttpServletRequest request,
                                final HttpServletResponse response) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        var resp = "";
        if (casUserProfile.isAdministrator()) {
            try (GitUtil git = repositoryFactory.masterRepository()) {
                val pending = git.branches()
                        .map(git::mapBranches)
                        .anyMatch(r -> filterPulls(r, new boolean[]{true, false, false}));
                if (pending) {
                    resp = "There are pending pull requests for your approval";
                }
            }
        }
        return resp;
    }

    private int pendingSubmits(final HttpServletRequest request,
                               final HttpServletResponse response,
                               final GitUtil git) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (casUserProfile.isAdministrator()) {
            return (int) git.branches()
                    .map(git::mapBranches)
                    .filter(r -> filterPulls(r, new boolean[]{true, false, false}))
                    .count();
        } else {
            return 0;
        }
    }

    /**
     * Method creates a branch object to be returned to the client.
     *
     * @param r - BranchMap
     * @return - BranchData
     */
    private static BranchData createBranch(final GitUtil.BranchMap r) {
        val branch = new BranchData();
        branch.setName(r.getName());
        branch.setMsg(r.getFullMessage());
        branch.setCommitter(r.getCommitter());
        branch.setTime(r.getCommitTime());
        branch.setAccepted(r.isAccepted());
        branch.setId(r.getId());
        branch.setRejected(r.isRejected());
        branch.setReverted(r.isReverted());
        return branch;
    }

}
