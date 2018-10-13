package org.apereo.cas.mgmt.authentication;

import org.apereo.cas.CasProtocolConstants;

import lombok.val;
import org.pac4j.core.client.Client;
import org.pac4j.core.config.Config;
import org.pac4j.core.context.Pac4jConstants;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.engine.DefaultSecurityLogic;
import org.pac4j.core.engine.decision.AlwaysUseSessionProfileStorageDecision;
import org.pac4j.core.exception.HttpAction;
import org.pac4j.springframework.web.SecurityInterceptor;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.stream.Collectors;

/**
 * This is {@link CasManagementSecurityInterceptor}.
 *
 * @author Misagh Moayyed
 * @since 5.1.0
 */
public class CasManagementSecurityInterceptor extends SecurityInterceptor {

    /**
     * Instantiates a new Cas management security interceptor.
     *
     * @param config the config
     */
    public CasManagementSecurityInterceptor(final Config config) {
        super(config, getClientNames(config), getAuthorizerNames(config));
        val logic = new CasManagementSecurityLogic();
        setSecurityLogic(logic);
    }

    @Override
    public void postHandle(final HttpServletRequest request, final HttpServletResponse response,
                           final Object handler, final ModelAndView modelAndView) {
        if (!StringUtils.isEmpty(request.getQueryString()) && request.getQueryString().contains(CasProtocolConstants.PARAMETER_TICKET)) {
            val view = new RedirectView(request.getRequestURL().toString());
            view.setExposeModelAttributes(false);
            view.setExposePathVariables(false);
            modelAndView.setView(view);
        }
    }

    private static String getClientNames(final Config config) {
        return config.getClients().getClients().stream().map(Client::getName).collect(Collectors.joining(Pac4jConstants.ELEMENT_SEPRATOR));
    }

    private static String getAuthorizerNames(final Config config) {
        return config.getAuthorizers().keySet().stream().collect(Collectors.joining(Pac4jConstants.ELEMENT_SEPRATOR));
    }

    /**
     * The Cas management security logic.
     */
    public static class CasManagementSecurityLogic extends DefaultSecurityLogic {
        public CasManagementSecurityLogic() {
            setProfileStorageDecision(new AlwaysUseSessionProfileStorageDecision());
        }

        @Override
        protected HttpAction forbidden(final WebContext context, final List currentClients, final List list, final String authorizers) {
            return HttpAction.redirect(context, "authorizationFailure");
        }
    }
}
