package org.apereo.cas.mgmt.services.web.factory;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Factory class to create repository objects.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
public class RepositoryFactory {

    @Autowired
    private CasUserProfileFactory casUserProfileFactory;

    @Autowired
    private CasConfigurationProperties casProperties;

    public RepositoryFactory() {
    }

    /**
     * Method looks up user from servlet request to return correct repository.
     *
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - GitUtil wrappinng the user's repository
     * @throws Exception - failed
     */
    public GitUtil from(final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        return from(casUserProfileFactory.from(request, response));
    }

    /**
     * Method loads the git repository based on the user and their permissions.
     *
     * @param user - CasUserProfile of logged in user
     * @return - GitUtil wrapping the user's repository
     * @throws Exception -failed
     */
    public GitUtil from(final CasUserProfile user) throws Exception {
        if (user.isAdministrator()) {
            return masterRepository();
        }
        final Path path = Paths.get(casProperties.getMgmt().getUserReposDir() + "/" + user.getId());
        if (!Files.exists(path)) {
            clone(path.toString());
        }
        return userRepository(user.getId()).rebase();
    }

    /**
     * Method returns a GitUtil wrapping the master repository.
     *
     * @return - GitUtil
     * @throws Exception - failed
     */
    public GitUtil masterRepository() throws Exception {
        return new GitUtil(new Git(new FileRepositoryBuilder()
                .setGitDir(new File(casProperties.getMgmt().getServicesRepo() + "/.git"))
                .setMustExist(true)
                .readEnvironment()
                .findGitDir()
                .build()));
    }


    private GitUtil userRepository(final String user) throws Exception {
        final String path = casProperties.getMgmt().getUserReposDir() + "/" + user + "/.git";
        return new GitUtil(new Git(new FileRepositoryBuilder()
                .setGitDir(new File(path))
                .setMustExist(true)
                .readEnvironment()
                .findGitDir()
                .build()));
    }

    /**
     * Clones the master repository into the passed in directory.
     *
     * @param clone - String representing dir to create the clone
     */
    public void clone(final String clone) {
        try {
            Git.cloneRepository()
                    .setURI(casProperties.getMgmt().getServicesRepo() + "/.git")
                    .setDirectory(new File(clone))
                    .call();
        } catch (final Exception e) {
        }
    }
}
