package org.apereo.cas.mgmt.services.web.factory;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
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

    private final CasManagementConfigurationProperties casProperties;
    private final CasUserProfileFactory casUserProfileFactory;

    /**
     * Method looks up user from servlet request to return correct repository.
     *
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - GitUtil wrapping the user's repository
     */
    public GitUtil from(final HttpServletRequest request, final HttpServletResponse response) {
        return from(casUserProfileFactory.from(request, response));
    }

    /**
     * Method loads the git repository based on the user and their permissions.
     *
     * @param user - CasUserProfile of logged in user
     * @return - GitUtil wrapping the user's repository
     */
    @SneakyThrows
    public GitUtil from(final CasUserProfile user) {
        if (user.isAdministrator()) {
            LOGGER.debug("User [{}] is not an administrator. Loading objects from master repository", user);
            return masterRepository();
        }
        val path = Paths.get(casProperties.getUserReposDir() + '/' + user.getId());
        if (!Files.exists(path)) {
            clone(path.toString());
        }
        return userRepository(user.getId());
    }

    /**
     * Method returns a GitUtil wrapping the master repository.
     *
     * @return - GitUtil
     */
    @SneakyThrows
    public GitUtil masterRepository() {
        val path = casProperties.getServicesRepo() + "/.git";
        return buildGitUtil(path);
    }

    @SneakyThrows
    private GitUtil userRepository(final String user) {
        val path = casProperties.getUserReposDir() + '/' + user + "/.git";
        return buildGitUtil(path);
    }

    @SneakyThrows
    private static GitUtil buildGitUtil(final String path) {
        return new GitUtil(path);
    }

    /**
     * Clones the master repository into the passed in directory.
     *
     * @param clone - String representing dir to create the clone
     * @return - GitUtil
     */
    public GitUtil clone(final String clone) {
        try {
            val uri = casProperties.getServicesRepo() + "/.git";
            LOGGER.debug("Cloning repository [{}] to path [{}]", uri, clone);
            return new GitUtil(Git.cloneRepository()
                .setURI(uri)
                .setDirectory(new File(clone))
                .call());
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }
}
