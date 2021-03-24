package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InsufficientAuthenticationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Base class for all controllers that handle version control functionality.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RequiredArgsConstructor
@Slf4j
public class AbstractVersionControlController {

    /**
     * {@link CasUserProfileFactory}.
     */
    protected final CasUserProfileFactory casUserProfileFactory;

    /**
     * Method to check if the current user is an Administrator.
     * Throws Exception if not an administrator.
     * Plan to replace this method with methdd level annotation @RequreAllRoles("ROLE_ADMIN")
     * with next Pac4J release.
     *
     * @param request - the request
     * @param response - the response
     * @return - True if user has ROLE_ADMIN
     */
    protected boolean isAdministrator(final HttpServletRequest request,
                                      final HttpServletResponse response) {
        return isAdministrator(casUserProfileFactory.from(request, response));
    }

    /**
     * Method to check if the current user is an Administrator.
     * Throws Exception if not an administrator.
     * Plan to replace this method with methdd level annotation @RequreAllRoles("ROLE_ADMIN")
     * with next Pac4J release.
     *
     * @param casUserProfile - the user profile
     * @return - True if user has ROLE_ADMIN
     */
    protected boolean isAdministrator(final CasUserProfile casUserProfile) {
        if (!casUserProfile.isAdministrator()) {
            throw new InsufficientAuthenticationException("You do not have permission");
        }
        return true;
    }

    protected boolean isUser(final HttpServletRequest request,
                             final HttpServletResponse response) {
        return isUser(casUserProfileFactory.from(request, response));
    }

    protected boolean isUser(final CasUserProfile casUserProfile) {
        if (!casUserProfile.isUser()) {
            throw new InsufficientAuthenticationException("You do not have permission");
        }
        return true;
    }
}
