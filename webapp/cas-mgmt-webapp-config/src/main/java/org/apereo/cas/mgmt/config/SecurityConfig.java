package org.apereo.cas.mgmt.config;

import lombok.val;
import org.pac4j.core.config.Config;
import org.pac4j.springframework.security.web.CallbackFilter;
import org.pac4j.springframework.security.web.LogoutFilter;
import org.pac4j.springframework.security.web.Pac4jEntryPoint;
import org.pac4j.springframework.security.web.SecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig {

    @Configuration
    @Order(1)
    public static class DefaultWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

        @Autowired
        private Config config;

        protected void configure(final HttpSecurity http) throws Exception {
            val callbackFilter = new CallbackFilter(config);
            val securityFilter = new SecurityFilter(config, "CasClient");
            http.antMatcher("/callback/**")
                    .addFilterBefore(callbackFilter, BasicAuthenticationFilter.class);
            http.antMatcher("/**")
            .addFilterBefore(securityFilter, BasicAuthenticationFilter.class)
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
        }
    }

}
