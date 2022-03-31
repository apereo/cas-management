package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.pac4j.core.config.Config;
import org.pac4j.springframework.security.web.CallbackFilter;
import org.pac4j.springframework.security.web.SecurityFilter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * Configures security adapters for CAS Management.
 *
 * @author Travis Schmidt
 * @since 6.3.3
 */
@Configuration(value = "casManagementSecurityConfiguration", proxyBeanMethods = false)
@EnableWebSecurity
@Slf4j
public class CasManagementSecurityConfiguration {
    
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
