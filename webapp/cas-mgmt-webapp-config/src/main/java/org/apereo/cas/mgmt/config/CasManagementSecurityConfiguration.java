package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.pac4j.core.authorization.authorizer.Authorizer;
import org.pac4j.core.client.Client;
import org.pac4j.core.client.Clients;
import org.pac4j.core.config.Config;
import org.pac4j.core.matching.matcher.PathMatcher;
import org.pac4j.springframework.security.web.CallbackFilter;
import org.pac4j.springframework.security.web.SecurityFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import java.util.List;

/**
 * Configures security adapters for CAS Management.
 *
 * @author Travis Schmidt
 * @since 6.3.3
 */
@Configuration(value = "casManagementSecurityConfiguration", proxyBeanMethods = false)
@EnableWebSecurity
@Slf4j
@EnableConfigurationProperties({CasConfigurationProperties.class,
    ServerProperties.class,
    CasManagementConfigurationProperties.class})
public class CasManagementSecurityConfiguration {


    /**
     * Gets default callback url.
     *
     * @param serverProperties the server properties
     * @return the default callback url
     */
    private static String getDefaultCallbackUrl(final ServerProperties serverProperties,
                                                final CasManagementConfigurationProperties managementProperties) {
        var contextPath = serverProperties.getServlet().getContextPath();
        return managementProperties.getServerName().concat(contextPath).concat("/callback");
    }

    @ConditionalOnMissingBean(name = "pac4jClientConfiguration")
    @Bean
    public Config pac4jClientConfiguration(
        final ServerProperties serverProperties,
        final List<Client> authenticationClients,
        @Qualifier("managementWebappAuthorizer")
        final Authorizer managementWebappAuthorizer,
        final CasManagementConfigurationProperties managementProperties) {
        var defaultCallbackUrl = getDefaultCallbackUrl(serverProperties, managementProperties);
        val cfg = new Config(new Clients(defaultCallbackUrl, authenticationClients));
        cfg.addAuthorizer("mgmtAuthorizer", managementWebappAuthorizer);
        cfg.addMatcher("excludedPath", new PathMatcher().excludeRegex("^/.*\\.(css|png|ico)$"));
        return cfg;
    }

    @Bean
    public WebSecurityConfigurerAdapter callbackFilterAdapter(
        final CasManagementConfigurationProperties mgmtProperties,
        @Qualifier("pac4jClientConfiguration")
        final Config config) {
        return new WebSecurityConfigurerAdapter() {
            @Override
            protected void configure(final HttpSecurity http) throws Exception {
                LOGGER.debug("Configuring Callback security filter");
                val callbackFilter = new CallbackFilter(config);
                http.antMatcher("/callback/**")
                    .addFilterBefore(callbackFilter, BasicAuthenticationFilter.class);

                if (mgmtProperties.isCasSso()) {
                    LOGGER.debug("Configuring CAS security filter");
                    val securityFilter = new SecurityFilter(config, "CasClient", "mgmtAuthorizer");
                    securityFilter.setMatchers("excludedPath");
                    http.antMatcher("/**")
                        .addFilterBefore(securityFilter, BasicAuthenticationFilter.class)
                        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
                    http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
                    http.headers().frameOptions().sameOrigin();
                    http.requiresChannel().anyRequest().requiresSecure();
                }

                if (StringUtils.isNotBlank(mgmtProperties.getAuthzIpRegex())) {
                    LOGGER.debug("Configuring Static IP security filter.");
                    val securityFilter = new SecurityFilter(config, "IpClient", "mgmtAuthorizer");
                    http.antMatcher("/**")
                        .addFilterBefore(securityFilter, BasicAuthenticationFilter.class)
                        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
                    http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
                    http.headers().frameOptions().sameOrigin();
                    http.requiresChannel().anyRequest().requiresSecure();
                }
            }
        };
    }
}
