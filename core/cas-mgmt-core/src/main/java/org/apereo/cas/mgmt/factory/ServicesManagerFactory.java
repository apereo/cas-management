package org.apereo.cas.mgmt.factory;

import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;

/**
 * Factory class to create ServiceManagers for the logged in user.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@RequiredArgsConstructor
public class ServicesManagerFactory implements MgmtManagerFactory<ServicesManager> {

    private final ServicesManager servicesManager;

    private final RegisteredServiceResourceNamingStrategy namingStrategy;

    /**
     * Method will look up the CasUserProfile for the logged in user and the return the GitServicesManager for
     * that user.
     *
     * @param authentication - user authentication
     * @return - GitServicesManager for the logged in user
     */
    @Override
    public ManagementServicesManager from(final Authentication authentication) {
        return new ManagementServicesManager(servicesManager, namingStrategy);
    }

    @Override
    public ServicesManager master() {
        return new ManagementServicesManager(servicesManager, namingStrategy);
    }

}
