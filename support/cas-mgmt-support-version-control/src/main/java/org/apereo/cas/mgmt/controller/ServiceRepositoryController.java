package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.Change;
import org.apereo.cas.mgmt.domain.Commit;
import org.apereo.cas.mgmt.domain.Diff;
import org.apereo.cas.mgmt.domain.GitStatus;
import org.apereo.cas.mgmt.domain.History;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;
import org.apereo.cas.util.io.CommunicationsManager;

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
    private final MgmtManagerFactory managerFactory;
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
        if (managementProperties.getVersionControl().getSyncScript() != null) {

            val status = Runtime.getRuntime().exec(managementProperties.getVersionControl().getSyncScript()).waitFor();
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
            //gitStatus.setPullRequests(pendingSubmits(request, response, git));
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
