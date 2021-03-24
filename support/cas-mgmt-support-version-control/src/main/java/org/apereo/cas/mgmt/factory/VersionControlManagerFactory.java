package org.apereo.cas.mgmt.factory;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.SneakyThrows;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.support.Beans;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.VersionControlServicesManager;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.services.ChainingServicesManager;
import org.apereo.cas.services.JsonServiceRegistry;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.ServicesManagerConfigurationContext;
import org.apereo.cas.services.domain.DefaultRegisteredServiceDomainExtractor;
import org.apereo.cas.services.domain.DefaultDomainAwareServicesManager;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;
import org.apereo.cas.util.io.WatcherService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.eclipse.jgit.api.Git;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.io.FileSystemResource;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;

/**
 * Factory class to create ServiceManagers for the logged in user.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@RequiredArgsConstructor
@Slf4j
public class VersionControlManagerFactory implements MgmtManagerFactory<ManagementServicesManager> {

    private static final String SERVICES_MANAGER_KEY = "servicesManager";

    private final ServicesManager servicesManager;
    private final ConfigurableApplicationContext applicationContext;
    private final CasManagementConfigurationProperties managementProperties;
    private final RepositoryFactory repositoryFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final CasConfigurationProperties casProperties;
    private final RegisteredServiceResourceNamingStrategy namingStrategy;
    private VersionControlServicesManager master;

    /**
     * Init repository.
     */
    @PostConstruct
    public void initRepository() {
        val servicesRepo = Paths.get(managementProperties.getVersionControl().getServicesRepo());
        if (!Files.exists(servicesRepo)) {
            try {
                Git.init().setDirectory(servicesRepo.toFile()).call().commit().setMessage("Created").call();
            } catch (final Exception e) {
                return;
            }
            try (GitUtil git = repositoryFactory.masterRepository()) {
                servicesManager.load();
                val manager = new VersionControlServicesManager(createChainingServiceManager(git), namingStrategy, git);
                manager.loadFrom(servicesManager);
                git.addWorkingChanges();
                git.commit("Initial commit");
                git.setPublished();
            } catch (final Exception e) {
                LOGGER.error(e.getMessage(), e);
            }
        }
        val git = repositoryFactory.masterRepository();
        this.master = new VersionControlServicesManager(createChainingServiceManager(git), namingStrategy, git);
    }

    /**
     * Method will look up the CasUserProfile for the logged in user and the return the GitServicesManager for
     * that user.
     *
     * @param request  - HttpServeltRequest
     * @param response - HttpServletRespone
     * @return - GitServicesManager for the logged in user
     */
    public ManagementServicesManager from(final HttpServletRequest request, final HttpServletResponse response) {
        return getManagementServicesManager(request, response);
    }

    /**
     * Creates a manager for the passed Git repo.
     *
     * @param git - the repo
     * @return - manager
     */
    public ManagementServicesManager from(final GitUtil git) {
        return new VersionControlServicesManager(createChainingServiceManager(git), namingStrategy, git);
    }


    private ManagementServicesManager getManagementServicesManager(final HttpServletRequest request, final HttpServletResponse response) {
        val user = casUserProfileFactory.from(request, response);
        if (!user.isUser() || user.isAdministrator()) {
            return master();
        }
        val session = request.getSession();
        val manager = session.getAttribute(SERVICES_MANAGER_KEY) != null ? getSessionManager(session, user) : createNewManager(request, response);
        session.setAttribute(SERVICES_MANAGER_KEY, manager);
        return manager;
    }

    private ManagementServicesManager getSessionManager(final HttpSession session, final CasUserProfile user) {
        val manager = (VersionControlServicesManager) session.getAttribute(SERVICES_MANAGER_KEY);
        manager.load();
        return manager;
    }

    private ManagementServicesManager createNewManager(final HttpServletRequest request, final HttpServletResponse response) {
        val git = repositoryFactory.from(request, response);
        return new VersionControlServicesManager(createChainingServiceManager(git), namingStrategy, git);
    }

    /**
     * Returns the master repo.
     *
     * @return - maste repo manager
     */
    public ManagementServicesManager master() {
        master.load();
        return master;
    }

    @SneakyThrows
    private ServicesManager createChainingServiceManager(final GitUtil git) {
        val cm = new ChainingServicesManager();
        val path = Paths.get(git.repoPath());

        val serviceRegistryDAO = new JsonServiceRegistry(new FileSystemResource(path),
                WatcherService.noOp(), null, null, namingStrategy, null);

        cm.registerServiceManager(createJSONServiceManager(serviceRegistryDAO));
        return cm;
    }

    @SneakyThrows
    private ServicesManager createJSONServiceManager(final JsonServiceRegistry serviceRegistry) {
        val activeProfiles = new HashSet<String>();
        val context = ServicesManagerConfigurationContext.builder()
                .serviceRegistry(serviceRegistry)
                .applicationContext(applicationContext)
                .environments(activeProfiles)
                .servicesCache(servicesManagerCache())
                .build();
        val cm = new DefaultDomainAwareServicesManager(context, new DefaultRegisteredServiceDomainExtractor());
        cm.load();
        return cm;
    }

    public Cache<Long, RegisteredService> servicesManagerCache() {
        val serviceRegistry = casProperties.getServiceRegistry();
        val duration = Beans.newDuration(serviceRegistry.getCache());
        return Caffeine.newBuilder()
                .initialCapacity(serviceRegistry.getCacheCapacity())
                .maximumSize(serviceRegistry.getCacheSize())
                .expireAfterWrite(duration)
                .recordStats()
                .build();
    }

}
