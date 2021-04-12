package org.apereo.cas.mgmt.config;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.pac4j.core.config.Config;
import org.pac4j.springframework.security.web.CallbackFilter;
import org.pac4j.springframework.security.web.SecurityFilter;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * Configures security adapters for CAS Management.
 *
 * @since 6.3.3
 * @author Travis Schmidt
 */
@ConditionalOnMissingBean(name = "casManagementSecurityConfiguration")
@EnableWebSecurity
@Slf4j
public class CasManagementSecurityConfiguration {


    /**
     * Configure the callback filter.
     */
    @Configuration("callbackFilter")
    @Order(1)
    protected static class CallbackFilterConfiguration extends WebSecurityConfigurerAdapter {

        @Autowired
        @Qualifier("pac4jClientConfiguration")
        private ObjectProvider<Config> config;

        protected void configure(final HttpSecurity http) throws Exception {
            LOGGER.debug("Configuring Callback security filter");
            val callbackFilter = new CallbackFilter(config.getObject());
            http.antMatcher("/callback/**")
                    .addFilterBefore(callbackFilter, BasicAuthenticationFilter.class);
        }
    }

    @Configuration("casFilter")
    @ConditionalOnProperty(prefix = "mgmt", name="cas-sso", matchIfMissing = true)
    @Order(2)
    protected static class CasFilterConfiguration extends WebSecurityConfigurerAdapter {

        @Autowired
        @Qualifier("pac4jClientConfiguration")
        private ObjectProvider<Config> config;

        protected void configure(final HttpSecurity http) throws Exception {
            LOGGER.debug("Configuring CAS security filter");
            val securityFilter = new SecurityFilter(config.getObject(), "CasClient", "mgmtAuthorizer");

            http.antMatcher("/**")
                    .addFilterBefore(securityFilter, BasicAuthenticationFilter.class)
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
            http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
            http.headers().frameOptions().sameOrigin();
            http.requiresChannel().anyRequest().requiresSecure();
        }
    }

    @Configuration("staticFilter")
    @ConditionalOnProperty(prefix = "mgmt", name="authz-ip-regex")
    @Order(3)
    protected static class StaticFilterConfiguration extends WebSecurityConfigurerAdapter {

        @Autowired
        @Qualifier("pac4jClientConfiguration")
        private ObjectProvider<Config> config;

        protected void configure(final HttpSecurity http) throws Exception {
            LOGGER.debug("Configuring Static IP security filter.");
            val securityFilter = new SecurityFilter(config.getObject(), "IpClient", "mgmtAuthorizer");

            http.antMatcher("/**")
                    .addFilterBefore(securityFilter, BasicAuthenticationFilter.class)
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
            http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
            http.headers().frameOptions().sameOrigin();
            http.requiresChannel().anyRequest().requiresSecure();
        }
    }
}
