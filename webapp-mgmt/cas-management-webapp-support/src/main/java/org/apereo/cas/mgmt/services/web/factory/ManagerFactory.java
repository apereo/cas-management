package org.apereo.cas.mgmt.services.web.factory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.services.MgmtServicesManager;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.DomainServicesManager;
import org.apereo.cas.services.JsonServiceRegistry;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.DefaultRegisteredServiceResourceNamingStrategy;
import org.eclipse.jgit.api.Git;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Factory class to create ServiceManagers for the logged in user.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@RequiredArgsConstructor
@Slf4j
public class ManagerFactory {

    private final ServicesManager servicesManager;
    private final CasManagementConfigurationProperties managementProperties;
    private final RepositoryFactory repositoryFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final CasConfigurationProperties casProperties;

    /**
     * Init repository.
     */
    @PostConstruct
    public void initRepository() {
        final Path servicesRepo = Paths.get(managementProperties.getServicesRepo());
        if (!Files.exists(servicesRepo)) {
            try {
                Git.init().setDirectory(servicesRepo.toFile()).call();
            } catch (final Exception e) {
                return;
            }
            try (GitUtil git = repositoryFactory.masterRepository()) {
                final MgmtServicesManager manager = new MgmtServicesManager(createJSONServiceManager(git), git);
                manager.loadFrom(servicesManager);
                git.addWorkingChanges();
                git.getGit().commit().setAll(true).setMessage("Initial commit").call();
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
     * @param request  - HttpServletRequest
     * @param response - HttpServletResponse
     * @return - GitServicesManager for the logged in user
     */
    public MgmtServicesManager from(final HttpServletRequest request, final HttpServletResponse response) {
        return from(request, casUserProfileFactory.from(request, response));
    }

    /**
     * Method will create the GitServicesManager for the user passed in the CasUserProfile.
     *
     * @param request - HttpServletRequest
     * @param user    - CasUserProfile of logged in user
     * @return - GitServicesManager for the logged in user
     */
    public MgmtServicesManager from(final HttpServletRequest request, final CasUserProfile user) {
        if (managementProperties.isEnableVersionControl()) {
            MgmtServicesManager manager = (MgmtServicesManager) request.getSession().getAttribute("servicesManager");
            if (manager != null) {
                if (!user.isAdministrator()) {
                    manager.getGit().rebase();
                }
                manager.load();
            } else {
                final GitUtil git;
                if (!user.isAdministrator()) {
                    git = repositoryFactory.from(user);
                    git.rebase();
                } else {
                    git = repositoryFactory.masterRepository();
                }
                manager = new MgmtServicesManager(createJSONServiceManager(git), git);
            }
            request.getSession().setAttribute("servicesManager", manager);
            return manager;
        } else {
            return new MgmtServicesManager(servicesManager, null);
        }
    }

    private ServicesManager createJSONServiceManager(final GitUtil git) {
        final ServicesManager manager;
        final JsonServiceRegistry serviceRegistryDAO = new JsonServiceRegistry(Paths.get(git.repoPath()), false, null, null,
            new DefaultRegisteredServiceResourceNamingStrategy());
        if (casProperties.getServiceRegistry().getManagementType() == ServiceRegistryProperties.ServiceManagementTypes.DOMAIN) {
            manager = new DomainServicesManager(serviceRegistryDAO, null);
        } else {
            manager = new DefaultServicesManager(serviceRegistryDAO, null);
        }
        manager.load();
        return manager;
    }
}
