package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domains.BranchActionData;
import org.apereo.cas.mgmt.domains.BranchData;
import org.apereo.cas.mgmt.domains.CNote;
import org.apereo.cas.mgmt.domains.Change;
import org.apereo.cas.mgmt.domains.Commit;
import org.apereo.cas.mgmt.domains.Diff;
import org.apereo.cas.mgmt.domains.GitStatus;
import org.apereo.cas.mgmt.domains.History;
import org.apereo.cas.mgmt.factory.ManagerFactory;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;
import org.apereo.cas.util.io.CommunicationsManager;

import com.google.common.base.Splitter;
import com.google.common.collect.Iterables;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.treewalk.TreeWalk;
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
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

/**
 * Controller the provides endpoints for using the Git workflow.
 *
 * @author Travis Schmidt
 * @since 5.2
 */
@RestController("versionControlController")
@RequestMapping(path = "/versionControl", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
@RequiredArgsConstructor
public class ServiceRepositoryController {

    private static final int MAX_COMMITS = 100;

    private final RepositoryFactory repositoryFactory;
    private final ManagerFactory managerFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final ServicesManager servicesManager;
    private final CommunicationsManager communicationsManager;

    private boolean publishError;

    /**
     * Method commits all modified and untracked work in the working tree.
     *
     * @param response - HttpServletResponse.
     * @param request  - HttpServletRequest.
     * @param msg      - Commit msg entered by the user.
     * @throws Exception - failed.
     */
    @PostMapping(value = "commit")
    @ResponseStatus(HttpStatus.OK)
    public void commit(final HttpServletResponse response, final HttpServletRequest request,
                       @RequestBody final String msg) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.from(user)) {
            if (git.isUndefined()) {
                throw new Exception("No changes to commit");
            }
            git.addWorkingChanges();
            git.commit(user, msg);
        }
    }

    /**
     * Method will pull the services-repo to the published-repo and then execute the script to sync with all CAS nodes.
     *
     * @param response - HttpServletResponse.
     * @param request  - HttpServletRequest.
     * @throws Exception - failed
     */
    @GetMapping(value = "/publish")
    @ResponseStatus(HttpStatus.OK)
    public void publish(final HttpServletResponse response, final HttpServletRequest request) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }
        try (GitUtil git = repositoryFactory.masterRepository()) {
            this.publishError = false;
            git.getUnpublishedCommits().forEach(commit -> {
                try {
                    val diffs = git.getPublishDiffs(commit.getId());

                    // Run through deletes first in case of name change
                    diffs.stream().filter(d -> d.getChangeType() == DiffEntry.ChangeType.DELETE)
                        .forEach(c -> {
                            val ser = new DefaultRegisteredServiceJsonSerializer();
                            try {
                                this.servicesManager.delete(ser.from(git.readObject(c.getOldId().toObjectId())).getId());
                            } catch (final Exception e) {
                                this.publishError = true;
                                LOGGER.error(e.getMessage(), e);
                            }
                        });
                    diffs.stream().filter(d -> d.getChangeType() != DiffEntry.ChangeType.DELETE)
                        .forEach(c -> {
                            val ser = new DefaultRegisteredServiceJsonSerializer();
                            try {
                                this.servicesManager.save(ser.from(git.readObject(c.getNewId().toObjectId())));
                            } catch (final Exception e) {
                                this.publishError = true;
                                LOGGER.error(e.getMessage(), e);
                            }
                        });
                } catch (final Exception e) {
                    this.publishError = true;
                    LOGGER.error(e.getMessage(), e);
                }
            });
            if (this.publishError) {
                throw new Exception("Services were not published because of a failure.  Please review logs and try again");
            }
            git.setPublished();
        }
        runSyncScript();
    }

    /**
     * Method to run sync script outside of publish.
     *
     * @param request  - the request
     * @param response - their resposne
     * @throws Exception - failed
     */
    @GetMapping("sync")
    @ResponseStatus(HttpStatus.OK)
    public void sync(final HttpServletRequest request,
                                       final HttpServletResponse response) throws Exception {
        val casUserProfile = casUserProfileFactory.from(request, response);
        if (!casUserProfile.isAdministrator()) {
            throw new Exception("You are not authorized for this operation");
        }
        runSyncScript();
    }

    /**
     * If a syncScript is configured it will be executed.
     *
     * @throws Exception - failed.
     */
    private void runSyncScript() throws Exception {
        if (managementProperties.getSyncScript() != null) {
            val status = Runtime.getRuntime().exec(managementProperties.getSyncScript()).waitFor();
            if (status > 0) {
                throw new Exception("Services Sync Failed");
            }
        }
    }

    /**
     * Method returns a list of commits that have not been published to CAS Servers.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - List of Commit
     * @throws Exception - failed.
     */
    @GetMapping(value = "commits")
    public List<Commit> commitLogs(final HttpServletRequest request,
                                   final HttpServletResponse response) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }

        try (GitUtil git = repositoryFactory.masterRepository()) {
            val commits = git.getLastNCommits(MAX_COMMITS)
                .map(c -> new Commit(c.abbreviate(GitUtil.NAME_LENGTH).name(),
                    c.getFullMessage(),
                    formatCommitTime(c.getCommitTime()))
                )
                .collect(toList());
            return commits;
        }
    }

    private static String formatCommitTime(final int ctime) {
        return LocalDateTime.ofInstant(new Date(ctime * 1000L).toInstant(),
            ZoneId.systemDefault())
            .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    /**
     * Method returns a list of commits that have not been published to CAS Servers.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - List of Commit
     * @throws Exception - failed.
     */
    @GetMapping(value = "commitList")
    public List<Commit> commits(final HttpServletRequest request,
                                final HttpServletResponse response) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }

        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.getUnpublishedCommits();
        }
    }

    /**
     * Returns true if the master repository has committs ahead of the published repository.
     *
     * @return - true if there are commits to publish.
     * @throws Exception - failed.
     */
    private boolean isPublishedBehind() throws Exception {
        try (GitUtil git = repositoryFactory.masterRepository()) {
            return !git.getRepository().resolve("HEAD").equals(git.getPublished().getPeeledObjectId());
        }
    }

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
            val emailProps = managementProperties.getNotifications().getSubmit();
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
     * Method returns to the client a payload that describes the state of the user's repository.
     *
     * @param request  - the request
     * @param response - the response
     * @return - GitStatus
     */
    @GetMapping("gitStatus")
    public GitStatus gitStatus(final HttpServletRequest request,
                               final HttpServletResponse response) {
        val gitStatus = new GitStatus();
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val status = git.status();
            gitStatus.setHasChanges(!status.isClean());
            gitStatus.setAdded(status.getUntracked().stream()
                .map(s -> getServiceName(git, s)).collect(Collectors.toSet()));
            gitStatus.setModified(status.getModified().stream()
                .map(s -> getServiceName(git, s)).collect(Collectors.toSet()));
            gitStatus.setDeleted(status.getMissing().stream()
                .map(s -> getDeletedServiceName(git, s)).collect(Collectors.toSet()));
            gitStatus.setUnpublished(isPublishedBehind());
            gitStatus.setPullRequests(pendingSubmits(request, response, git));
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }

        return gitStatus;
    }

    private static String getServiceName(final GitUtil git, final String path) {
        val serializer = new DefaultRegisteredServiceJsonSerializer();
        try {
            return serializer.from(Paths.get(git.repoPath() + '/' + path).toFile()).getName() + " - " + path;
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return path;
    }

    private static String getDeletedServiceName(final GitUtil git, final String path) {
        val serializer = new DefaultRegisteredServiceJsonSerializer();
        try {
            val treeWalk = new TreeWalk(git.getRepository());
            treeWalk.addTree(git.getLastNCommits(1).findFirst().get().getTree());
            while (treeWalk.next()) {
                if (treeWalk.getPathString().endsWith(path)) {
                    return serializer.from(git.readObject(treeWalk.getObjectId(0))).getName() + " - " + path;
                }
            }
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return path;
    }


    /**
     * Method returns a list of changes to the client of work that has not been committed to the repo.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @return - List of Change
     * @throws Exception - failed.
     */
    @GetMapping("untracked")
    public List<Change> untracked(final HttpServletResponse response,
                                  final HttpServletRequest request) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            if (git.isUndefined()) {
                return new ArrayList<>();
            }
            val changes = git.scanWorkingDiffs().stream()
                .map(d -> createChange(d, git))
                .collect(toList());
            return changes;
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
                                     @RequestBody final boolean[] options) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }
        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.branches()
                .map(git::mapBranches)
                .filter(r -> filterPulls(r, options))
                .map(ServiceRepositoryController::createBranch)
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
                .map(ServiceRepositoryController::createBranch)
                .collect(toList());
        }
    }

    /**
     * Method that will create a list of Diff objects to be returned to the client detailing the changes between the
     * submitted branch and the current state of the services-repo.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @param branch   - name of branch submitted
     * @return - List of Diff
     * @throws Exception - failed
     */
    @GetMapping(value = "/changes")
    public List<Diff> changes(final HttpServletResponse response,
                              final HttpServletRequest request,
                              @RequestParam("branch") final String branch) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }

        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.getDiffsMinus1(branch).stream()
                .map(d -> createDiff(d, git))
                .collect(toList());
        }
    }

    /**
     * Method returns a list of changes committed by a commit int the repository.
     *
     * @param response - the response
     * @param request  - the request
     * @param id       - String representing an id of a commit
     * @return - List of Differences
     * @throws Exception - failed
     */
    @GetMapping("commitHistoryList")
    public List<Diff> commitHistoryList(final HttpServletResponse response,
                                        final HttpServletRequest request,
                                        @RequestParam("id") final String id) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }

        try (GitUtil git = repositoryFactory.masterRepository()) {
            val r = git.getCommit(id);
            return git.getPublishDiffs(id).stream()
                .map(d -> createDiff(d, git))
                .map(d -> {
                    d.setCommitter(r.getCommitterIdent().getName());
                    d.setCommitTime(formatCommitTime(r.getCommitTime()));
                    d.setCommit(id);
                    return d;
                })
                .collect(toList());
        }
    }

    /**
     * Method returns a String representation in diff format for the changes between the submitted file and what is
     * currently in the services-repo.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param ids      - Array of ids to compare
     * @throws Exception - failed
     */
    @PostMapping(value = "viewDiff", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void viewDiff(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final @RequestBody String[] ids) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val newId = ObjectId.fromString(ids[0]);
            val oldId = ObjectId.fromString(ids[1]);
            response.getOutputStream().write(git.getFormatter(oldId, newId));
        }
    }

    /**
     * Method returns a RegisteredService instance of the the submitted service that it can be viewed in the
     * online form before being accepted by an admin.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @param id       - id of service
     * @return ResponseEntity
     * @throws Exception - failed
     */
    @GetMapping(value = "viewChange")
    public RegisteredService viewChange(final HttpServletResponse response,
                                        final HttpServletRequest request,
                                        final @RequestParam String id) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            return new DefaultRegisteredServiceJsonSerializer().from(git.readObject(id));
        }
    }

    /**
     * Returns a diff as a string representing the change made to a file in a commit.
     *
     * @param response - the response
     * @param request  - the request
     * @param id       - the commit id
     * @param path     - the file path
     * @return - the diff
     * @throws Exception -failed
     */
    @GetMapping("changeMade")
    public String changeMade(final HttpServletResponse response,
                             final HttpServletRequest request,
                             final @RequestParam String id,
                             final @RequestParam String path) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val diff = git.getChange(id, path);
            return new String(git.getFormatter(diff.getNewId().toObjectId(),
                diff.getOldId().toObjectId()), StandardCharsets.UTF_8);
        } catch (final Exception e) {
            response.setStatus(HttpStatus.NO_CONTENT.value());
            return "No difference";
        }
    }

    /**
     * Compares the file in given commit to the current HEAD.
     *
     * @param response - the response
     * @param request  - the request
     * @param id       - the commit id
     * @param path     - the path of the file
     * @return - String of the diff
     * @throws Exception - failed.
     */
    @GetMapping("compareWithHead")
    public String compareWithHead(final HttpServletResponse response,
                                  final HttpServletRequest request,
                                  final @RequestParam String id,
                                  final @RequestParam String path) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val diff = git.getChange("HEAD", id, path);
            return new String(git.getFormatter(diff.getNewId().toObjectId(),
                diff.getOldId().toObjectId()), StandardCharsets.UTF_8);
        } catch (final Exception e) {
            response.setStatus(HttpStatus.NO_CONTENT.value());
            return "No difference";
        }
    }

    /**
     * Method returns a RegisteredService instance of the the submitted service that it can be viewed in the
     * online form before being accepted by an admin.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @param id       - id of service
     * @return - Array of RegisteredService
     * @throws Exception - failed
     */
    @GetMapping("changePair")
    public RegisteredService[] changePair(final HttpServletResponse response,
                                          final HttpServletRequest request,
                                          @RequestParam final String id) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val change = new DefaultRegisteredServiceJsonSerializer().from(git.readObject(id));
            val casUserProfile = casUserProfileFactory.from(request, response);
            val orig = managerFactory.from(request, casUserProfile).findServiceBy(change.getId());
            val resp = new RegisteredService[]{change, orig};
            return resp;
        }
    }

    /**
     * Method will return a previous version of a service in HJson.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       - String representing file in git repo
     * @return - String representing service version in HJson
     * @throws Exception - failed
     */
    @GetMapping("viewJSON")
    public String viewJSON(final HttpServletRequest request,
                           final HttpServletResponse response,
                           final @RequestParam String id) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            return git.readObject(id);
        }
    }

    /**
     * Method will return a previous version of the services in Yaml.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       - String representing id of the file in git repo
     * @return - String representing the verison of the service in Yaml
     * @throws Exception - failed
     */
    @GetMapping("viewYaml")
    public String viewYaml(final HttpServletRequest request,
                           final HttpServletResponse response,
                           final @RequestParam String id) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val jsonSerializer = new DefaultRegisteredServiceJsonSerializer();
            val service = jsonSerializer.from(git.readObject(id));
            val yamlSerializer = new RegisteredServiceYamlSerializer();
            val output = new ByteArrayOutputStream();
            yamlSerializer.to(output, service);
            return output.toString();
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
        val branch = acception.getBranch();
        val text = acception.getNote();
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission Denied");
        }

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
            val emailProps = managementProperties.getNotifications().getAccept();
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
            val emailProps = managementProperties.getNotifications().getReject();
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
     * Method will return a complete history of commits for a given file.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param path     - path of file
     * @return - List of History
     * @throws Exception - failed
     */
    @GetMapping("history")
    public List<History> history(final HttpServletRequest request,
                                                 final HttpServletResponse response,
                                                 final @RequestParam String path) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val history = git.history(path);
            return history;
        }
    }

    /**
     * Method will revert a file by checking it out and overwritting the working dir.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param path     - path of the file
     * @throws Exception - failed
     */
    @GetMapping("revert")
    @ResponseStatus(HttpStatus.OK)
    public void revert(final HttpServletRequest request,
                                         final HttpServletResponse response,
                                         final @RequestParam String path) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            if (git.isUndefined()) {
                throw new Exception("No changes to revert");
            }
            git.checkout(path, "HEAD");
        }
    }

    /**
     * Method will checkout a file with passed id into the working directory.
     *
     * @param request  - the request
     * @param response - the response
     * @param id       - the id of the commit
     * @throws Exception - failed
     */
    @GetMapping("revertRepo")
    @ResponseStatus(HttpStatus.OK)
    public void revertRepo(final HttpServletRequest request,
                                             final HttpServletResponse response,
                                             final @RequestParam String id) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val svc = new DefaultRegisteredServiceJsonSerializer().from(git.readObject(id));
            val mgmtServicesManager = managerFactory.from(request, user);
            mgmtServicesManager.save(svc);
        }
    }

    /**
     * Method will restore a deleted file to the working dir.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param path     - path of the file
     * @throws Exception - failed
     */
    @GetMapping("revertDelete")
    @ResponseStatus(HttpStatus.OK)
    public void revertDelete(final HttpServletRequest request,
                                               final HttpServletResponse response,
                                               final @RequestParam String path) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.from(user)) {
            if (git.isUndefined()) {
                throw new Exception("No changes to revert");
            }
            val manager = managerFactory.from(request, user);
            insertService(git, path);
            git.checkoutFile(path);
        }
    }

    /**
     * Method will checkout a file from a specific commit.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       - Id of the commit to checkout the file from
     * @param path     - path of the file
     * @throws Exception - failed
     */
    @GetMapping("checkout")
    public void checkout(final HttpServletRequest request,
                                           final HttpServletResponse response,
                                           @RequestParam final String id,
                                           @RequestParam final String path) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            git.checkout(path, id);
            git.reset(path);
        }
    }

    /**
     * Method will checkout all changes in the passed commit to the working directory.
     *
     * @param response - the response
     * @param request  - the request
     * @param id       - Id of the commit
     * @throws Exception - failed
     */
    @GetMapping("checkoutCommit")
    @ResponseStatus(HttpStatus.OK)
    public void checkoutCommit(final HttpServletResponse response,
                                                 final HttpServletRequest request,
                                                 @RequestParam final String id) throws Exception {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isAdministrator()) {
            throw new Exception("Permission denied");
        }

        try (GitUtil git = repositoryFactory.masterRepository()) {
            val r = git.getCommit(id);
            git.getDiffsToRevert(id).stream().forEach(d -> {
                try {
                    if (d.getChangeType() == DiffEntry.ChangeType.ADD) {
                        git.rm(d.getNewPath());
                    } else {
                        git.checkout(d.getOldPath(), id + "~1");
                    }
                } catch (final Exception e) {
                    LOGGER.error(e.getMessage(), e);
                }
            });
        }
    }

    /**
     * Restores a service into the service from at its original location.
     *
     * @param git  - GitUtil
     * @param path - path of the file
     * @throws Exception - failed
     */
    private static void insertService(final GitUtil git, final String path) throws Exception {
        val ser = new DefaultRegisteredServiceJsonSerializer();
        ser.from(git.readObject(git.history(path).get(0).getId()));
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

    /**
     * Factory method used to create a Change object to be returned to the client.
     *
     * @param entry - DiffEntry
     * @param git   - GitUtil
     * @return - Change
     */
    private Change createChange(final DiffEntry entry, final GitUtil git) {
        try {
            if (entry.getChangeType() == DiffEntry.ChangeType.DELETE) {
                return createDeleteChange(git, entry);
            } else {
                return createModifyChange(git, entry);
            }
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return null;
    }

    /**
     * Creates a change for a delete file.
     *
     * @param git   - GitUtil
     * @param entry - DiffEntry for the change.
     * @return - Change
     * @throws Exception - failed
     */
    private static Change createDeleteChange(final GitUtil git, final DiffEntry entry) throws Exception {
        val json = git.readObject(entry.getOldId().toObjectId());
        val ser = new DefaultRegisteredServiceJsonSerializer();
        val svc = ser.from(json);
        return new Change(String.valueOf(svc.getId()),
            entry.getOldPath(),
            DiffEntry.ChangeType.DELETE.toString(),
            svc.getName(),
            ObjectId.toString(entry.getOldId().toObjectId()),
            null);
    }

    /**
     * Creates a change for a modified file.
     *
     * @param git   - GitUtil
     * @param entry - DiffEntry for the change
     * @return - Change
     * @throws Exception - failed
     */
    @SuppressWarnings("DefaultCharset")
    private static Change createModifyChange(final GitUtil git, final DiffEntry entry) throws Exception {
        val file = git.repoPath() + '/' + entry.getNewPath();
        val json = new String(Files.readAllBytes(Paths.get(file)));
        val ser = new DefaultRegisteredServiceJsonSerializer();
        val svc = ser.from(json);
        return new Change(String.valueOf(svc.getId()),
            entry.getNewPath(),
            entry.getChangeType().toString(),
            svc.getName(),
            ObjectId.toString(entry.getOldId().toObjectId()),
            ObjectId.toString(entry.getNewId().toObjectId()));
    }

    /**
     * Method creates a diff object to be returned to the client.
     *
     * @param d - DiffEntry
     * @return - Diff
     */
    private static Diff createDiff(final DiffEntry d, final GitUtil git) {
        try {
            val ser = new DefaultRegisteredServiceJsonSerializer();
            var service = (RegisteredService) null;
            if (d.getChangeType() == DiffEntry.ChangeType.ADD) {
                service = ser.from(git.readObject(d.getNewId().toObjectId()));
            } else {
                service = ser.from(git.readObject(d.getOldId().toObjectId()));
            }
            return new Diff(d.getNewPath(),
                d.getOldId().toObjectId(),
                d.getNewId().toObjectId(),
                d.getChangeType().toString(),
                service.getName());
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }
}
