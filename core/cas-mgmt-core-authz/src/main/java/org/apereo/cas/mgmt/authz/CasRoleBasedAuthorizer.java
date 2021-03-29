package org.apereo.cas.mgmt.authz;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.pac4j.core.authorization.authorizer.RequireAnyRoleAuthorizer;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.profile.CommonProfile;

import java.util.List;

/**
 * This is {@link CasRoleBasedAuthorizer}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@Slf4j
public class CasRoleBasedAuthorizer extends RequireAnyRoleAuthorizer<CommonProfile> {

    public CasRoleBasedAuthorizer(final List<String> roles) {
        super(roles);
    }

    @Override
    protected boolean isProfileAuthorized(final WebContext context, final CommonProfile profile) {
        LOGGER.debug("Evaluating profile [{}]", profile);
        if (!isStaffOrFaculty(profile)) {
            LOGGER.warn("Unable to authorize access, since the authenticated profile [{}] does not contain any required roles", profile);
            return false;
        }
        val admin = profile.getRoles().contains("ROLE_ADMIN");
        if (context.getPath().contains("management") && profile.getRoles().isEmpty()) {
            LOGGER.warn("Unknown user attempted access to management: access denied");
            return false;
        }
        if (context.getPath().contains("dashboard") && !admin) {
            LOGGER.warn("Non Admin user attempted to access dashboard: access denied");
            return false;
        }
        return true;
    }

    private boolean isStaffOrFaculty(final CommonProfile profile) {
        val aff = profile.getAttribute("eduPersonAffiliation");
        if (aff == null) {
            LOGGER.error("Person is neither staff or faculty");
            return false;
        }
        if (aff instanceof String) {
            return ((String) aff).contains("staff") || ((String) aff).contains("faculty");
        }
        return ((List<String>) aff).contains("staff") || ((List<String>) aff).contains("faculty");
    }
}
