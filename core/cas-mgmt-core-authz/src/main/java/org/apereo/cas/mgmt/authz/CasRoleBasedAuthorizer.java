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
        val result = super.isProfileAuthorized(context, profile);
        if (!result) {
            LOGGER.warn("Unable to authorize access, since the authenticated profile [{}] does not contain any required roles", profile);
        } else {
            LOGGER.debug("Successfully authorized access for profile [{}]", profile);
        }
        return result;
    }
}
