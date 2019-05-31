package org.apereo.cas.mgmt.audit;

import org.apereo.cas.util.HttpRequestUtils;

import lombok.val;
import org.apereo.inspektr.common.spi.PrincipalResolver;
import org.aspectj.lang.JoinPoint;
import org.pac4j.core.context.J2EContext;
import org.pac4j.core.context.session.J2ESessionStore;
import org.pac4j.core.profile.CommonProfile;
import org.pac4j.core.profile.ProfileManager;

import java.util.Optional;

/**
 * Principal resolver for inspektr based on pac4j.
 *
 * @author Jerome Leleu
 * @since 4.2.0
 */
public class Pac4jAuditablePrincipalResolver implements PrincipalResolver {

    @Override
    public String resolveFrom(final JoinPoint auditableTarget, final Object retval) {
        return getFromSecurityContext();
    }

    @Override
    public String resolveFrom(final JoinPoint auditableTarget, final Exception exception) {
        return getFromSecurityContext();
    }

    @Override
    public String resolve() {
        return getFromSecurityContext();
    }

    private static String getFromSecurityContext() {
        val request = HttpRequestUtils.getHttpServletRequestFromRequestAttributes();
        val response = HttpRequestUtils.getHttpServletResponseFromRequestAttributes();
        if (request != null && response != null) {
            val context = new J2EContext(request, response, new J2ESessionStore());
            val manager = new ProfileManager<>(context, context.getSessionStore());
            val profile = (Optional<CommonProfile>) manager.get(true);
            if (profile != null && profile.isPresent()) {
                val id = profile.get().getId();
                if (id != null) {
                    return id;
                }
            }
        }
        return PrincipalResolver.UNKNOWN_USER;
    }

}
