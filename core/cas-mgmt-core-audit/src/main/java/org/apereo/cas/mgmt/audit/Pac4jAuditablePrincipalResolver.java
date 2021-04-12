package org.apereo.cas.mgmt.audit;

import org.apereo.cas.util.HttpRequestUtils;

import lombok.val;
import org.apereo.inspektr.common.spi.PrincipalResolver;
import org.aspectj.lang.JoinPoint;
import org.pac4j.core.context.JEEContext;
import org.pac4j.core.context.session.JEESessionStore;
import org.pac4j.core.profile.ProfileManager;

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
            val context = new JEEContext(request, response);
            val manager = new ProfileManager(context, JEESessionStore.INSTANCE);
            val profile = manager.getProfile();
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
