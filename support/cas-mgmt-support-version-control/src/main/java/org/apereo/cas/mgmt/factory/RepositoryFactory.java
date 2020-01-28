package org.apereo.cas.mgmt.factory;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.eclipse.jgit.api.Git;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Factory class to create repository objects.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@RequiredArgsConstructor
@Slf4j
public class RepositoryFactory {

    private static final String REPO_DIR = "/.git";
    private static final String REPO_VAR = "userRepo";

    private final CasManagementConfigurationProperties casProperties;
    private final CasUserProfileFactory casUserProfileFactory;
    private GitUtil masterRepository;

    /**
     * Method looks up user from servlet request to return correct repository.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - GitUtil wrapping the user's repository
     */
    public GitUtil from(final HttpServletRequest request, final HttpServletResponse response) {
        return from(casUserProfileFactory.from(request, response), request);
    }

    @SneakyThrows
    private GitUtil from(final CasUserProfile user, final HttpServletRequest request) {
        if (!user.isUser()) {
            return null;
        }
        if (user.isAdministrator()) {
            return masterRepository();
        }
        if (request.getSession().getAttribute(REPO_VAR) != null) {
            val userRepo = (GitUtil) request.getSession().getAttribute(REPO_VAR);
            userRepo.rebase();
            return userRepo;
        }
        val path = Paths.get(casProperties.getDelegated().getUserReposDir() + '/' + user.getId());
        if (!Files.exists(path)) {
            clone(path.toString());
        }
        val userRepo = userRepository(user.getId());
        request.setAttribute(REPO_VAR, userRepo);
        return userRepo;
    }

    /**
     * Method returns a GitUtil wrapping the master repository.
     *
     * @return - GitUtil
     */
    @SneakyThrows
    public GitUtil masterRepository() {
        if (masterRepository == null) {
            this.masterRepository = buildGitUtil(casProperties.getVersionControl().getServicesRepo());
        }
        return masterRepository;
    }

    @SneakyThrows
    private GitUtil userRepository(final String user) {
        return buildGitUtil(casProperties.getDelegated().getUserReposDir() + '/' + user);
    }

    @SneakyThrows
    private static GitUtil buildGitUtil(final String path) {
        return new GitUtil(path + REPO_DIR);
    }

    /**
     * Clones the master repository into the passed in directory.
     *
     * @param clone - String representing dir to create the clone
     * @return - GitUtil
     */
    public GitUtil clone(final String clone) {
        val uri = casProperties.getVersionControl().getServicesRepo() + REPO_DIR;
        LOGGER.debug("Cloning repository [{}] to path [{}]", uri, clone);
        try (val git = Git.cloneRepository().setURI(uri).setDirectory(new File(clone)).call()) {
            return new GitUtil(git);
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }
}
