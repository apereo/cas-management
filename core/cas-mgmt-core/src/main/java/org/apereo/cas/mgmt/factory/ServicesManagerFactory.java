package org.apereo.cas.mgmt.factory;

import org.apereo.cas.mgmt.ManagementServicesManager;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.NoOpVersionControl;
import org.apereo.cas.services.ServicesManager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.pac4j.core.profile.UserProfile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Factory class to create ServiceManagers for the logged in user.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@RequiredArgsConstructor
@Slf4j
public class ServicesManagerFactory implements MgmtManagerFactory {

    private final ServicesManager servicesManager;

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
        return new ManagementServicesManager(servicesManager, new NoOpVersionControl());
    }

    /**
     * Method will create the GitServicesManager for the user passed in the CasUserProfile.
     *
     * @param request - HttpServletRequest
     * @param user    - CasUserProfile of logged in user
     * @return - GitServicesManager for the logged in user
     * @throws Exception the exception
     */
    public ManagementServicesManager from(final HttpServletRequest request, final UserProfile user) throws Exception {
        return new ManagementServicesManager(servicesManager, new NoOpVersionControl());
    }

}
