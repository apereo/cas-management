package org.apereo.cas.mgmt.authentication;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.pac4j.core.context.J2EContext;
import org.pac4j.core.profile.ProfileManager;
import org.pac4j.core.profile.UserProfile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

/**
 * This is {@link CasUserProfileFactory}.
 *
 * @author Misagh Moayyed
 * @author Travis Schmidt
 * @since 5.2.0
 */
@RequiredArgsConstructor
@Slf4j
public class CasUserProfileFactory {
    private final CasManagementConfigurationProperties casProperties;

    /**
     * create user profile for views.
     *
     * @param request  the request
     * @param response the response
     * @return the cas user profile
     */
    public CasUserProfile from(final HttpServletRequest request, final HttpServletResponse response) {
        val manager = new ProfileManager(new J2EContext(request, response));
        val profile = (Optional<UserProfile>) manager.get(true);
        if (profile.isPresent()) {
            val up = profile.get();
            val cas = new CasUserProfile(up, this.casProperties.getAdminRoles());
            LOGGER.debug("Located CAS user profile [{}]", cas);
            return cas;
        }
        throw new IllegalArgumentException("Could not determine authenticated profile");
    }
}
