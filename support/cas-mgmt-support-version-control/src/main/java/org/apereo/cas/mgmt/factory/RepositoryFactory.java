package org.apereo.cas.mgmt.factory;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.support.Beans;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.eclipse.jgit.api.Git;
import org.springframework.security.core.Authentication;
import jakarta.annotation.PostConstruct;
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

    private static final int INITIAL_CACHE_SIZE = 10;

    private static final int MAX_CACHE_SIZE = 100;

    private final CasManagementConfigurationProperties casProperties;

    private GitUtil masterRepository;

    private Cache<Authentication, GitUtil> repositoryCache;

    @PostConstruct
    public void init() {
        this.repositoryCache = managementServicesManagerCache();

    }

    /**
     * Method looks up user from servlet request to return correct repository.
     *
     * @param authentication - HttpServletRequest
     * @return - GitUtil wrapping the user's repository
     */
    @SneakyThrows
    public GitUtil from(final Authentication authentication) {
        val user = new CasUserProfile(authentication);
        if (!user.isUser() || user.isAdministrator()) {
            return masterRepository();
        }
        if (repositoryCache.asMap().containsKey(authentication)) {
            val userRepo = (GitUtil) repositoryCache.getIfPresent(authentication);
            userRepo.rebase();
            return userRepo;
        }
        val path = Paths.get(casProperties.getDelegated().getUserReposDir() + '/' + user.getId());
        if (!Files.exists(path)) {
            clone(path.toString());
        }
        val userRepo = userRepository(user.getId());
        repositoryCache.put(authentication, userRepo);
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

    private static Cache<Authentication, GitUtil> managementServicesManagerCache() {
        val duration = Beans.newDuration("PT30M");
        return Caffeine.newBuilder()
            .initialCapacity(INITIAL_CACHE_SIZE)
            .maximumSize(MAX_CACHE_SIZE)
            .expireAfterWrite(duration)
            .recordStats()
            .build();
    }
}
