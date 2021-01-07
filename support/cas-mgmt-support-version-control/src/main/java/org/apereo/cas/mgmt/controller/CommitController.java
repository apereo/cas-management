package org.apereo.cas.mgmt.controller;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.PendingRequests;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.Commit;
import org.apereo.cas.mgmt.domain.GitStatus;
import org.apereo.cas.mgmt.exception.PublishFailureException;
import org.apereo.cas.mgmt.exception.SyncScriptFailureException;
import org.apereo.cas.mgmt.exception.VersionControlException;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.ServicesManager;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.eclipse.jgit.api.errors.GitAPIException;
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

    private static final int NO_CHANGES_FOUND = 244;

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
                       @RequestBody final String msg) {
        val user = casUserProfileFactory.from(request, response);
        isUser(user);
        try (GitUtil git = repositoryFactory.from(request, response)) {
            if (git.isUndefined()) {
                response.setStatus(NO_CHANGES_FOUND);
                return;
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
     * @throws PublishFailureException - failed
     * @throws SyncScriptFailureException - failed
     */
    @GetMapping(value = "/publish")
    @ResponseStatus(HttpStatus.OK)
    public void publish(final HttpServletResponse response, final HttpServletRequest request)
            throws PublishFailureException, SyncScriptFailureException {
        isAdministrator(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            git.getUnpublishedCommits().forEach(commit -> {
                val diffs = publishDiffs(git, commit);
                /** Run through deletes first in case of name change */
                diffs.stream().filter(d -> d.getChangeType() == DiffEntry.ChangeType.DELETE)
                        .forEach(c -> this.servicesManager.delete(CasManagementUtils.fromJson(getService(git, c.getOldId())).getId()));
                diffs.stream().filter(d -> d.getChangeType() != DiffEntry.ChangeType.DELETE)
                        .forEach(c -> this.servicesManager.save(CasManagementUtils.fromJson(getService(git, c.getNewId()))));
            });
            git.setPublished();
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            throw new PublishFailureException();
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
     * @throws SyncScriptFailureException - failed
     */
    @GetMapping("/sync")
    @ResponseStatus(HttpStatus.OK)
    public void sync(final HttpServletRequest request,
                     final HttpServletResponse response) throws SyncScriptFailureException {
        isAdministrator(request, response);
        runSyncScript();
    }

    /**
     * If a syncScript is configured it will be executed.
     *
     * @throws SyncScriptFailureException - failed.
     */
    private void runSyncScript() throws SyncScriptFailureException {
        if (managementProperties.getVersionControl().getSyncScript() != null) {
            try {
                val status = Runtime.getRuntime().exec(managementProperties.getVersionControl().getSyncScript()).waitFor();
                if (status > 0) {
                    LOGGER.error("SyncScript returned value > 0");
                    throw new SyncScriptFailureException();
                }
            } catch (final IOException e) {
                LOGGER.error(e.getMessage(), e);
                throw new SyncScriptFailureException();
            } catch (final InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new SyncScriptFailureException();
            }
        }
    }

    /**
     * Method returns a list of commits that have not been published to CAS Servers.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - List of Commit
     * @throws VersionControlException - failed.
     */
    @GetMapping("unpublished")
    public List<Commit> commits(final HttpServletRequest request,
                                final HttpServletResponse response) throws VersionControlException {
        isAdministrator(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.getUnpublishedCommits();
        } catch (final IOException | GitAPIException e) {
            LOGGER.error(e.getMessage(), e);
            throw new VersionControlException();
        }
    }

    /**
     * Returns true if the master repository has commits ahead of the published repository.
     *
     * @return - true if there are commits to publish.
     * @throws IOException - failed.
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
        isUser(request, response);
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
