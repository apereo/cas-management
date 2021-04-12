package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.authentication.CasUserProfile;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;

/**
 * Base class for all controllers that handle version control functionality.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@RequiredArgsConstructor
public class AbstractVersionControlController {

    /**
     * Method to check if the current user is an Administrator.
     * Throws Exception if not an administrator.
     * Plan to replace this method with methdd level annotation @RequreAllRoles("ROLE_ADMIN")
     * with next Pac4J release.
     *
     * @param authentication - the user
     * @return - True if user has ROLE_ADMIN
     */
    protected boolean isAdministrator(final Authentication authentication) {
        return isAdministrator(CasUserProfile.from(authentication));
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

    protected boolean isUser(final Authentication authentication) {
        return isUser(CasUserProfile.from(authentication));
    }

    protected boolean isUser(final CasUserProfile casUserProfile) {
        if (!casUserProfile.isUser()) {
            throw new InsufficientAuthenticationException("You do not have permission");
        }
        return true;
    }
}
