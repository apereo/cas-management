package org.apereo.cas.mgmt.factory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.DomainServicesManager;
import org.apereo.cas.services.JsonServiceRegistry;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.DefaultRegisteredServiceResourceNamingStrategy;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.eclipse.jgit.diff.DiffEntry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Paths;
import java.util.HashMap;

/**
 * Factory class to create ServiceManagers for the logged in user.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@RequiredArgsConstructor
@Slf4j
public class ManagerFactory implements MgmtManagerFactory<ManagementServicesManager> {

    private final ServicesManager servicesManager;
    private final CasManagementConfigurationProperties managementProperties;
    private final RepositoryFactory repositoryFactory;
    private final CasUserProfileFactory casUserProfileFactory;
    private final CasConfigurationProperties casProperties;

    private HashMap<Integer, String> uncommitted = new HashMap<>();
    /**
     * Method will look up the CasUserProfile for the logged in user and the return the GitServicesManager for
     * that user.
     *
     * @param request  - HttpServeltRequest
     * @param response - HttpServletRespone
     * @return - GitServicesManager for the logged in user
     * @throws Exception - failed
     */
    public ManagementServicesManager from(final HttpServletRequest request, final HttpServletResponse response) throws Exception {
        return from(request, casUserProfileFactory.from(request, response));
    }

    /**
     * Method will create the GitServicesManager for the user passed in the CasUserProfile.
     *
     * @param request - HttpServletRequest
     * @param user    - CasUserProfile of logged in user
     * @return - GitServicesManager for the logged in user
     * @throws Exception the exception
     */
    public ManagementServicesManager from(final HttpServletRequest request, final CasUserProfile user) throws Exception {
        if (!managementProperties.isEnableVersionControl()) {
            val git = new GitUtil();
            LOGGER.info("Version control & change management is disabled in CAS configuration");
            return new ManagementServicesManager(servicesManager);
        }
        return getManagementServicesManager(request, user);
    }

    /**
     * Creates a manager for the passed Git repo.
     *
     * @param git - the repo
     * @return - manager
     * @throws Exception - failed
     */
    public ManagementServicesManager from(final GitUtil git) throws Exception {
        return new ManagementServicesManager(createJSONServiceManager(git));
    }


    private ManagementServicesManager getManagementServicesManager(final HttpServletRequest request, final CasUserProfile user) {
        val session = request.getSession();
        var manager = (ManagementServicesManager) session.getAttribute("servicesManager");
        if (manager != null) {
            if (!user.isAdministrator()) {
                //manager.getGit().rebase();
            }
            manager.load();
        } else {
            var git = (GitUtil) null;
            if (!user.isAdministrator()) {
                git = repositoryFactory.from(user);
                git.rebase();
            } else {
                git = repositoryFactory.masterRepository();
            }
            manager = new ManagementServicesManager(createJSONServiceManager(git));
        }
        session.setAttribute("servicesManager", manager);
        return manager;
    }

    /**
     * Returns the master repo.
     *
     * @return - maste repo manager
     * @throws Exception -failed
     */
    public ManagementServicesManager master() throws Exception {
        val git = repositoryFactory.masterRepository();
        return new ManagementServicesManager(createJSONServiceManager(git));
    }

    private ServicesManager createJSONServiceManager(final GitUtil git) {
        var manager = (ServicesManager) null;
        val path = Paths.get(git.repoPath());
        val serviceRegistryDAO = new JsonServiceRegistry(path,
            false, null, null,
            new DefaultRegisteredServiceResourceNamingStrategy());
        if (casProperties.getServiceRegistry().getManagementType() == ServiceRegistryProperties.ServiceManagementTypes.DOMAIN) {
            manager = new DomainServicesManager(serviceRegistryDAO, null);
        } else {
            manager = new DefaultServicesManager(serviceRegistryDAO, null);
        }
        manager.load();
        return manager;
    }

    /*
    private void createChange(final DiffEntry entry) {
        try {
            val ser = new DefaultRegisteredServiceJsonSerializer();
            var svc = (RegisteredService) null;
            if (entry.getChangeType() == DiffEntry.ChangeType.DELETE) {
                svc = ser.from(git.readObject(entry.getOldId().toObjectId()));
            } else {
                svc = ser.from(new File(git.repoPath() + '/' + entry.getNewPath()));
            }
            LOGGER.debug("Created change entry for service [{}]", svc.getServiceId());

            if (this.uncommitted.containsKey(svc.getId())) {
                this.uncommitted.replace(svc.getId(), "MODIFY");
            } else {
                this.uncommitted.put(svc.getId(), entry.getChangeType().toString());
            }
        } catch (final Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
    }
    */

}
