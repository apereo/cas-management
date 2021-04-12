package org.apereo.cas.mgmt.authz;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.pac4j.core.authorization.authorizer.RequireAnyRoleAuthorizer;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.context.session.SessionStore;
import org.pac4j.core.profile.UserProfile;

import java.util.List;

/**
 * This is {@link CasRoleBasedAuthorizer}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@Slf4j
public class CasRoleBasedAuthorizer extends RequireAnyRoleAuthorizer {

    public CasRoleBasedAuthorizer(final List<String> roles) {
        super(roles);
    }
    
    @Override
    protected boolean isProfileAuthorized(final WebContext context, final SessionStore sessionStore, final UserProfile profile) {
        LOGGER.trace("Evaluating profile [{}]", profile);
        val result = super.isProfileAuthorized(context, sessionStore, profile);
        if (!result) {
            LOGGER.warn("Unable to authorize access, since the authenticated profile [{}] does not contain any required roles", profile);
        } else {
            LOGGER.trace("Successfully authorized access for profile [{}]", profile);
        }
        return result;
    }
}
