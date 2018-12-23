package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.PendingRequests;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.Commit;
import org.apereo.cas.mgmt.domain.GitStatus;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.ServicesManager;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.lib.AbbreviatedObjectId;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.SyncFailedException;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller that handles request for commits.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("commitController")
@RequestMapping(path = "api/commit", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class CommitController extends AbstractVersionControlController {

    private final RepositoryFactory repositoryFactory;
    private final CasManagementConfigurationProperties managementProperties;
    private final ServicesManager servicesManager;
    private final ObjectProvider<PendingRequests> pendingRequests;

    public CommitController(final RepositoryFactory repositoryFactory,
                            final CasUserProfileFactory casUserProfileFactory,
                            final CasManagementConfigurationProperties managementProperties,
                            final ServicesManager servicesManager,
                            final ObjectProvider<PendingRequests> pendingRequests) {
        super(casUserProfileFactory);
        this.repositoryFactory =repositoryFactory;
        this.managementProperties = managementProperties;
        this.servicesManager = servicesManager;
        this.pendingRequests = pendingRequests;
    }

    /**
     * Method commits all modified and untracked work in the working tree.
     *
     * @param response - HttpServletResponse.
     * @param request  - HttpServletRequest.
     * @param msg      - Commit msg entered by the user.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public void commit(final HttpServletResponse response,
                       final HttpServletRequest request,
                       final @RequestBody String msg) {
        val user = casUserProfileFactory.from(request, response);
        try (GitUtil git = repositoryFactory.from(user)) {
            if (git.isUndefined()) {
                throw new IllegalArgumentException("No changes to commit");
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
     * @throws IOException - failed
     */
    @GetMapping(value = "/publish")
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public void publish(final HttpServletResponse response, final HttpServletRequest request) {
        isAdministrator(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            git.getUnpublishedCommits().forEach(commit -> {
                val diffs = publishDiffs(git, commit);
                // Run through deletes first in case of name change
                diffs.stream().filter(d -> d.getChangeType() == DiffEntry.ChangeType.DELETE)
                        .forEach(c -> this.servicesManager.delete(CasManagementUtils.fromJson(getService(git, c.getOldId())).getId()));
                diffs.stream().filter(d -> d.getChangeType() != DiffEntry.ChangeType.DELETE)
                        .forEach(c -> this.servicesManager.save(CasManagementUtils.fromJson(getService(git, c.getNewId()))));
            });
            git.setPublished();
        } catch (final Exception e) {
            throw new SyncFailedException("Services were not published because of a failure.  Please review logs and try again");
        }
        runSyncScript();
    }

    @SneakyThrows
    private String getService(final GitUtil git, final AbbreviatedObjectId id) {
        return git.readObject(id.toObjectId());
    }

    @SneakyThrows
    private List<DiffEntry> publishDiffs(final GitUtil git, final Commit commit) {
        return git.getPublishDiffs(commit.getId());
    }

    /**
     * Method to run sync script outside of publish.
     *
     * @param request  - the request
     * @param response - their resposne
     * @throws Exception - failed
     */
    @GetMapping("/sync")
    @ResponseStatus(HttpStatus.OK)
    @SneakyThrows
    public void sync(final HttpServletRequest request,
                     final HttpServletResponse response) {
        isAdministrator(request, response);
        runSyncScript();
    }

    /**
     * If a syncScript is configured it will be executed.
     *
     * @throws Exception - failed.
     */
    private void runSyncScript() throws IOException, InterruptedException {
        if (managementProperties.getVersionControl().getSyncScript() != null) {
            val status = Runtime.getRuntime().exec(managementProperties.getVersionControl().getSyncScript()).waitFor();
            if (status > 0) {
                throw new SyncFailedException("Services Sync Failed");
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
    @GetMapping("unpublished")
    public List<Commit> commits(final HttpServletRequest request,
                                final HttpServletResponse response) throws Exception {
        isAdministrator(request, response);
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
    private boolean isPublishedBehind() throws IOException {
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
    @GetMapping("status")
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
            pendingRequests.ifAvailable(p -> gitStatus.setPullRequests(p.pendingSubmits(request, response)));
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }

        return gitStatus;
    }

    private static String getServiceName(final GitUtil git, final String path) {
        try {
            return CasManagementUtils.fromJson(Paths.get(git.repoPath() + '/' + path).toFile()).getName() + " - " + path;
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return path;
    }

    private static String getDeletedServiceName(final GitUtil git, final String path) {
        try (val treeWalk = new TreeWalk(git.getRepository())) {
            treeWalk.addTree(git.getLastNCommits(1).findFirst().orElseThrow().getTree());
            while (treeWalk.next()) {
                if (treeWalk.getPathString().endsWith(path)) {
                    return CasManagementUtils.fromJson(git.readObject(treeWalk.getObjectId(0))).getName() + " - " + path;
                }
            }
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return path;
    }
}
