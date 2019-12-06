package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.domain.Change;
import org.apereo.cas.mgmt.domain.Diff;
import org.apereo.cas.mgmt.exception.NoDifferenceException;
import org.apereo.cas.mgmt.exception.VersionControlException;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.RegisteredService;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.ObjectId;
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
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * Controller that handles request for changes.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RestController("changeController")
@RequestMapping(path = "api/change", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class ChangeController extends AbstractVersionControlController {

    private static final int NO_DIFFERENCE_STATUS = 266;

    private final RepositoryFactory repositoryFactory;
    private final MgmtManagerFactory managerFactory;

    public ChangeController(final RepositoryFactory repositoryFactory,
                            final MgmtManagerFactory managerFactory,
                            final CasUserProfileFactory casUserProfileFactory) {
        super(casUserProfileFactory);
        this.repositoryFactory = repositoryFactory;
        this.managerFactory = managerFactory;
    }
    /**
     * Method returns a list of changes to the client of work that has not been committed to the repo.
     *
     * @param response - HttpServletResponse
     * @param request  - HttpServletRequest
     * @return - List of Change
     */
    @GetMapping("untracked")
    public List<Change> untracked(final HttpServletResponse response,
                                  final HttpServletRequest request) {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            if (git.isUndefined()) {
                return new ArrayList<>();
            }
            return git.scanWorkingDiffs().stream()
                    .map(d -> VersionControlUtil.createChange(d, git))
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
     * @throws VersionControlException - failed
     */
    @PostMapping
    public List<Diff> changes(final HttpServletResponse response,
                              final HttpServletRequest request,
                              final @RequestBody String branch) throws VersionControlException {
        isAdministrator(request, response);
        try (GitUtil git = repositoryFactory.masterRepository()) {
            return git.getDiffsMinus1(branch).stream()
                    .map(d -> VersionControlUtil.createDiff(d, git))
                    .collect(toList());
        } catch (final IOException | GitAPIException ex) {
            LOGGER.error(ex.getMessage(), ex);
            throw new VersionControlException();
        }
    }


    /**
     * Method returns a String representation in diff format for the changes between the submitted file and what is
     * currently in the services-repo.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param ids      - Array of ids to compare
     * @throws VersionControlException - failed
     */
    @PostMapping(value = "diff")
    @ResponseStatus(HttpStatus.OK)
    public void viewDiff(final HttpServletRequest request,
                         final HttpServletResponse response,
                         final @RequestBody String[] ids) throws VersionControlException {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val newId = ObjectId.fromString(ids[0]);
            val oldId = ObjectId.fromString(ids[1]);
            response.getOutputStream().write(git.getFormatter(oldId, newId));
        } catch (final IOException ex) {
            LOGGER.error(ex.getMessage(), ex);
            throw new VersionControlException();
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
     * @throws VersionControlException - failed
     */
    @GetMapping("{id}")
    public RegisteredService viewChange(final HttpServletResponse response,
                                        final HttpServletRequest request,
                                        final @PathVariable String id) throws VersionControlException {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            return CasManagementUtils.fromJson(git.readObject(id));
        } catch (final IOException ex) {
            LOGGER.error(ex.getMessage(), ex);
            throw new VersionControlException();
        }
    }

    /**
     * Returns a diff as a string representing the change made to a file in a commit.
     *
     * @param response - the response
     * @param request  - the request
     * @param data     - String[] {path, id}
     * @return - the diff
     * @throws VersionControlException - failed
     */
    @PostMapping("made")
    @ResponseStatus(HttpStatus.OK)
    public String changeMade(final HttpServletResponse response,
                             final HttpServletRequest request,
                             final @RequestBody String[] data) throws VersionControlException {
        val path = data[0];
        val id = data[1];
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val diff = git.getChange(id, path);
            return new String(git.getFormatter(diff.getNewId().toObjectId(),
                    diff.getOldId().toObjectId()),
                    StandardCharsets.UTF_8);
        } catch (final NoDifferenceException noDiff) {
            response.setStatus(NO_DIFFERENCE_STATUS);
            return "No difference";
        } catch (final IOException | GitAPIException ex) {
            LOGGER.error(ex.getMessage(), ex);
            throw new VersionControlException();
        }
    }

    /**
     * Compares the file in given commit to the current HEAD.
     *
     * @param response - the response
     * @param request  - the request
     * @param data     - String[] {path, id}
     * @return - String of the diff
     * @throws VersionControlException - failed
     */
    @PostMapping("compare")
    public String compareWithHead(final HttpServletResponse response,
                                  final HttpServletRequest request,
                                  final @RequestBody String[] data) throws VersionControlException {
        val path = data[0];
        val id = data[1];
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val diff = git.getChange("HEAD", id, path);
            return new String(git.getFormatter(diff.getNewId().toObjectId(),
                    diff.getOldId().toObjectId()),
                    StandardCharsets.UTF_8);
        } catch (final NoDifferenceException noDiff) {
            response.setStatus(NO_DIFFERENCE_STATUS);
            return "No difference";
        } catch (final IOException | GitAPIException ex) {
            LOGGER.error(ex.getMessage(), ex);
            throw new VersionControlException();
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
     * @throws VersionControlException - failed
     */
    @GetMapping("pair/{id}")
    public RegisteredService[] changePair(final HttpServletResponse response,
                                          final HttpServletRequest request,
                                          final @PathVariable String id) throws VersionControlException {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val change = CasManagementUtils.fromJson(git.readObject(id));
            val orig = managerFactory.from(request, response).findServiceBy(change.getId());
            return new RegisteredService[]{change, orig};
        } catch (final IOException ex) {
            LOGGER.error(ex.getMessage(), ex);
            throw new VersionControlException();
        }
    }

    /**
     * Method will return a previous version of a service in HJson.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       - String representing file in git repo
     * @return - String representing service version in HJson
     * @throws VersionControlException - failed
     */
    @GetMapping("json/{id}")
    public String viewJSON(final HttpServletRequest request,
                           final HttpServletResponse response,
                           final @PathVariable String id) throws VersionControlException {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            return git.readObject(id);
        } catch (final IOException ex) {
            LOGGER.error(ex.getMessage(), ex);
            throw new VersionControlException();
        }
    }

    /**
     * Method will return a previous version of the services in Yaml.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @param id       - String representing id of the file in git repo
     * @return - String representing the verison of the service in Yaml
     * @throws VersionControlException - failed
     */
    @GetMapping("yaml/{id}")
    public String viewYaml(final HttpServletRequest request,
                           final HttpServletResponse response,
                           final @PathVariable String id) throws VersionControlException {
        try (GitUtil git = repositoryFactory.from(request, response)) {
            val service = CasManagementUtils.fromJson(git.readObject(id));
            return CasManagementUtils.toYaml(service);
        } catch (final IOException ex) {
            LOGGER.error(ex.getMessage(), ex);
            throw new VersionControlException();
        }
    }

}
