package org.apereo.cas.mgmt.factory;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryCoreProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.VersionControlServiceRegistry;
import org.apereo.cas.mgmt.VersionControlServicesManager;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.ServicesManagerConfigurationContext;
import org.apereo.cas.services.domain.DefaultDomainAwareServicesManager;
import org.apereo.cas.services.domain.DefaultRegisteredServiceDomainExtractor;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.eclipse.jgit.api.Git;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.io.FileSystemResource;
import org.springframework.security.core.Authentication;

import javax.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Objects;

/**
 * Factory class to create ServiceManagers for the logged in user.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@RequiredArgsConstructor
@Slf4j
public class VersionControlManagerFactory implements MgmtManagerFactory<ManagementServicesManager> {

    private static final int INITIAL_CACHE_SIZE = 10;

    private static final int MAX_CACHE_SIZE = 100;

    private final ServicesManager servicesManager;

    private final ConfigurableApplicationContext applicationContext;

    private final CasManagementConfigurationProperties managementProperties;

    private final RepositoryFactory repositoryFactory;

    private final CasConfigurationProperties casProperties;

    private final RegisteredServiceResourceNamingStrategy namingStrategy;

    private VersionControlServicesManager master;

    private Cache<Authentication, ManagementServicesManager> managerCache;

    private static Cache<Authentication, ManagementServicesManager> managementServicesManagerCache() {
        return Caffeine.newBuilder()
            .initialCapacity(INITIAL_CACHE_SIZE)
            .maximumSize(MAX_CACHE_SIZE)
            .recordStats()
            .build();
    }

    /**
     * Init repository.
     */
    @PostConstruct
    public void initRepository() {
        val servicesRepo = Paths.get(managementProperties.getVersionControl().getServicesRepo());
        this.managerCache = managementServicesManagerCache();
        if (!Files.exists(servicesRepo)) {
            try {
                Git.init().setDirectory(servicesRepo.toFile()).call().commit().setSign(false).setMessage("Created").call();
            } catch (final Exception e) {
                LOGGER.error(e.getMessage(), e);
                throw new RuntimeException(e);
            }
            try (GitUtil git = repositoryFactory.masterRepository()) {
                servicesManager.load();
                val manager = new VersionControlServicesManager(createVersionControlServiceManager(git), namingStrategy, git);
                manager.loadFrom(servicesManager);
                git.addWorkingChanges();
                git.commit("Initial commit");
                git.setPublished();
            } catch (final Exception e) {
                LOGGER.error(e.getMessage(), e);
            }
        }
        val git = repositoryFactory.masterRepository();
        this.master = new VersionControlServicesManager(createVersionControlServiceManager(git), namingStrategy, git);
    }

    /**
     * Method will look up the CasUserProfile for the logged in user and the return the GitServicesManager for
     * that user.
     *
     * @param authentication - user authentication
     * @return - GitServicesManager for the logged in user
     */
    public ManagementServicesManager from(final Authentication authentication) {
        return getManagementServicesManager(authentication);
    }

    /**
     * Creates a manager for the passed Git repo.
     *
     * @param git - the repo
     * @return - manager
     */
    public ManagementServicesManager from(final GitUtil git) {
        return new VersionControlServicesManager(createVersionControlServiceManager(git), namingStrategy, git);
    }

    /**
     * Returns the master repo.
     *
     * @return - master repo manager
     */
    public ManagementServicesManager master() {
        master.load();
        return master;
    }

    public Cache<Long, RegisteredService> servicesManagerCache() {
        val serviceRegistry = casProperties.getServiceRegistry();
        return Caffeine.newBuilder()
            .initialCapacity(serviceRegistry.getCache().getInitialCapacity())
            .maximumSize(serviceRegistry.getCache().getCacheSize())
            .recordStats()
            .build();
    }

    private ManagementServicesManager getManagementServicesManager(final Authentication authentication) {
        val user = new CasUserProfile(authentication);
        if (!user.isUser() || user.isAdministrator()) {
            return master();
        }

        val manager = Objects.requireNonNull(managerCache.asMap().containsKey(authentication)
            ? managerCache.getIfPresent(authentication)
            : createNewManager(authentication));
        if (managerCache.asMap().containsKey(authentication)) {
            manager.load();
        } else {
            managerCache.put(authentication, manager);
        }
        return manager;
    }

    private ManagementServicesManager createNewManager(final Authentication authentication) {
        val git = repositoryFactory.from(authentication);
        return new VersionControlServicesManager(createVersionControlServiceManager(git), namingStrategy, git);
    }

    @SneakyThrows
    private ServicesManager createVersionControlServiceManager(final GitUtil git) {
        val activeProfiles = new HashSet<String>();
        val serviceRegistryDAO = new VersionControlServiceRegistry(new FileSystemResource(Paths.get(git.repoPath())), namingStrategy);
        val context = ServicesManagerConfigurationContext.builder()
            .serviceRegistry(serviceRegistryDAO)
            .applicationContext(applicationContext)
            .environments(activeProfiles)
            .servicesCache(servicesManagerCache())
            .build();

        val cm = casProperties.getServiceRegistry().getCore().getManagementType() == ServiceRegistryCoreProperties.ServiceManagementTypes.DOMAIN
            ? new DefaultDomainAwareServicesManager(context, new DefaultRegisteredServiceDomainExtractor())
            : new DefaultServicesManager(context);
        cm.load();
        return cm;
    }

}
