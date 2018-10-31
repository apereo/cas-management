package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.Commit;
import org.apereo.cas.mgmt.domain.Diff;
import org.apereo.cas.mgmt.domain.History;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.util.CasManagementUtils;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.eclipse.jgit.diff.DiffEntry;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * Controller that handles requests for history.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("historyController")
@RequestMapping(path = "api/history", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class HistoryController extends AbstractVersionControlController {

    private static final int MAX_COMMITS = 100;

    private final RepositoryFactory repositoryFactory;
    private final MgmtManagerFactory managerFactory;

    public HistoryController(final RepositoryFactory repositoryFactory,
                             final MgmtManagerFactory managerFactory,
                             final CasUserProfileFactory casUserProfileFactory) {
        super(casUserProfileFactory);
        this.repositoryFactory = repositoryFactory;
        this.managerFactory = managerFactory;
    }

    /**
     * Method returns a list of the last MAX_COMMITS commits in the service repositoiry.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - List of Commit
     * @throws Exception - failed.
     */
    @GetMapping
    public List<Commit> history(final HttpServletRequest request,
                                final HttpServletResponse response) throws Exception {
        isAdministrator(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val commits = git.getLastNCommits(MAX_COMMITS)
                    .filter(c -> !c.getFullMessage().equals("Created"))
                    .map(c -> new Commit(c.abbreviate(GitUtil.NAME_LENGTH).name(),
                            c.getFullMessage(),
                            CasManagementUtils.formatDateTime(c.getCommitTime()))
                    )
                    .collect(toList());
            return commits;
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
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public List<History> history(final HttpServletRequest request,
                                 final HttpServletResponse response,
                                 final @RequestBody String path) throws Exception {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            return git.history(path);
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
    @GetMapping("commit/{id}")
    public List<Diff> commitHistoryList(final HttpServletResponse response,
                                        final HttpServletRequest request,
                                        final @PathVariable String id) throws Exception {
        isAdministrator(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val r = git.getCommit(id);
            return git.getPublishDiffs(id).stream()
                    .map(d -> VersionControlUtil.createDiff(d, git))
                    .map(d -> {
                        d.setCommitter(r.getCommitterIdent().getName());
                        d.setCommitTime(CasManagementUtils.formatDateTime(r.getCommitTime()));
                        d.setCommit(id);
                        return d;
                    })
                    .collect(toList());
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
    @GetMapping("revert/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void revertRepo(final HttpServletRequest request,
                           final HttpServletResponse response,
                           final @PathVariable String id) throws Exception {
        isAdministrator(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            val svc = CasManagementUtils.fromJson(git.readObject(id));
            val mgmtServicesManager = managerFactory.from(request, response);
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
            VersionControlUtil.insertService(git, path);
            git.checkoutFile(path);
        }
    }

    /**
     * Method will checkout a file from a specific commit.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param data     - String[] {path, id}
     * @throws Exception - failed
     */
    @PostMapping("checkout")
    public void checkout(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final @RequestBody String[] data) throws Exception{
        val path = data[0];
        val id = data[1];
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
    @GetMapping("checkout/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void checkoutCommit(final HttpServletResponse response,
                               final HttpServletRequest request,
                               final @PathVariable String id) throws Exception {
        isAdministrator(request, response);
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

}
