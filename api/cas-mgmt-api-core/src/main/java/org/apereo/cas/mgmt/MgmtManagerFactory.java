package org.apereo.cas.mgmt;

import org.apereo.cas.services.ServicesManager;
import org.pac4j.core.profile.UserProfile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Interface for factory to create instances services manager.
 *
 * @author Travis Schmidt
 * @param <T> - ServicesManager
 * @since 6.0
 */
public interface MgmtManagerFactory<T extends ServicesManager> {
    /**
     * Method will look up the CasUserProfile for the logged in user and the return the GitServicesManager for
     * that user.
     *
     * @param request  - HttpServeltRequest
     * @param response - HttpServletRespone
     * @return - GitServicesManager for the logged in user
     * @throws Exception - failed
     */
    T from(HttpServletRequest request, HttpServletResponse response) throws Exception;

    /**
     * Method will create the GitServicesManager for the user passed in the CasUserProfile.
     *
     * @param request - HttpServletRequest
     * @param user    - CasUserProfile of logged in user
     * @return - GitServicesManager for the logged in user
     * @throws Exception the exception
     */
    T from(HttpServletRequest request, UserProfile user) throws Exception;
}
