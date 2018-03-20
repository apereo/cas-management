package org.apereo.cas.mgmt.authz;

import org.pac4j.core.authorization.authorizer.RequireAnyRoleAuthorizer;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.exception.HttpAction;
import org.pac4j.core.profile.CommonProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * This is {@link CasRoleBasedAuthorizer}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
public class CasRoleBasedAuthorizer extends RequireAnyRoleAuthorizer<CommonProfile> {
    private static final Logger LOGGER = LoggerFactory.getLogger(CasRoleBasedAuthorizer.class);

    public CasRoleBasedAuthorizer(final List<String> roles) {
        super(roles);
    }

    @Override
    protected boolean isProfileAuthorized(final WebContext context, final CommonProfile profile) throws HttpAction {
        LOGGER.debug("Evaluating profile [{}]", profile);
        if (context.getFullRequestURL().contains("register.html")) {
            context.setSessionAttribute("register", "true");
        } else if (context.getFullRequestURL().contains("manage.html")) {
            context.setSessionAttribute("register", "false");
        }
        final boolean result = isStaffOrFaculty(profile) &&
                (context.getSessionAttribute("register").equals("true") || super.isProfileAuthorized(context, profile));
        if (!result) {
            LOGGER.warn("Unable to authorize access, since the authenticated profile [{}] does not contain any required roles", profile);
        } else {
            LOGGER.debug("Successfully authorized access for profile [{}]", profile);
        }
        return result;
    }

    private boolean isStaffOrFaculty(CommonProfile profile) {
        final String aff = (String)profile.getAttribute("eduPersonAffiliation");
        return aff.contains("staff") || aff.contains("faculty");
    }
}
