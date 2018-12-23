package org.apereo.cas.mgmt.factory;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.VersionControlServicesManager;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.DomainServicesManager;
import org.apereo.cas.services.JsonServiceRegistry;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.eclipse.jgit.api.Git;
import org.pac4j.core.profile.UserProfile;

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
    private final CasManagementConfigurationProperties managementProperties;
    private final RepositoryFactory repositoryFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final CasConfigurationProperties casProperties;
    private final RegisteredServiceResourceNamingStrategy namingStrategy;

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
                val manager = new VersionControlServicesManager(createJSONServiceManager(git), namingStrategy, git);
                manager.loadFrom(servicesManager);
                git.addWorkingChanges();
                git.commit("Initial commit");
                git.setPublished();
            } catch (final Exception e) {
                LOGGER.error(e.getMessage(), e);
            }
        }
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
        return from(request, casUserProfileFactory.from(request, response));
    }

    /**
     * Method will create the GitServicesManager for the user passed in the CasUserProfile.
     *
     * @param request - HttpServletRequest
     * @param user    - CasUserProfile of logged in user
     * @return - GitServicesManager for the logged in user
     */
    public ManagementServicesManager from(final HttpServletRequest request, final UserProfile user) {
        return getManagementServicesManager(request, user);
    }

    /**
     * Creates a manager for the passed Git repo.
     *
     * @param git - the repo
     * @return - manager
     */
    public ManagementServicesManager from(final GitUtil git) {
        return new VersionControlServicesManager(createJSONServiceManager(git), namingStrategy, git);
    }


    private ManagementServicesManager getManagementServicesManager(final HttpServletRequest request, final UserProfile userProfile) {
        val user = (CasUserProfile) userProfile;
        val session = request.getSession();
        val manager = session.getAttribute(SERVICES_MANAGER_KEY) != null ? getSessionManager(session, user) : createNewManager(user);
        session.setAttribute(SERVICES_MANAGER_KEY, manager);
        return manager;
    }

    private ManagementServicesManager getSessionManager(final HttpSession session, final CasUserProfile user) {
        val manager = (VersionControlServicesManager) session.getAttribute(SERVICES_MANAGER_KEY);
        if (!user.isAdministrator()) {
            manager.rebase();
        }
        manager.load();
        return manager;
    }

    private ManagementServicesManager createNewManager(final CasUserProfile user) {
        val git = !user.isAdministrator() ? repositoryFactory.from(user).rebase() : repositoryFactory.masterRepository();
        return new VersionControlServicesManager(createJSONServiceManager(git), namingStrategy, git);
    }

    /**
     * Returns the master repo.
     *
     * @return - maste repo manager
     */
    public ManagementServicesManager master() {
        val git = repositoryFactory.masterRepository();
        return new VersionControlServicesManager(createJSONServiceManager(git), namingStrategy, git);
    }

    private ServicesManager createJSONServiceManager(final GitUtil git) {
        val path = Paths.get(git.repoPath());

        val serviceRegistryDAO = new JsonServiceRegistry(path,
            false, null, null, namingStrategy);
        val manager = (ServicesManager) (casProperties.getServiceRegistry().getManagementType() == ServiceRegistryProperties.ServiceManagementTypes.DOMAIN
                ? new DomainServicesManager(serviceRegistryDAO, null, new HashSet<>())
                : new DefaultServicesManager(serviceRegistryDAO, null, new HashSet<>()));
        manager.load();
        return manager;
    }

}
