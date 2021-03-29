package org.apereo.cas.mgmt.config;

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
    public static class CasWebSecurityConfigurationAdpapter extends WebSecurityConfigurerAdapter {

        @Autowired
        private Config config;

        protected void configure(final HttpSecurity http) throws Exception {

            final CallbackFilter callbackFilter = new CallbackFilter(config);

            final LogoutFilter logoutFilter = new LogoutFilter(config, "/?defaulturlafterlogout");
            logoutFilter.setDestroySession(true);
            logoutFilter.setSuffix("/pac4jLogout");

            final LogoutFilter centralLogoutFilter = new LogoutFilter(config, "http://localhost:8080/?defaulturlafterlogoutafteridp");
            centralLogoutFilter.setLocalLogout(false);
            centralLogoutFilter.setCentralLogout(true);
            centralLogoutFilter.setLogoutUrlPattern("http://localhost:8080/.*");
            centralLogoutFilter.setSuffix("/pac4jCentralLogout");

            http
                    .authorizeRequests()
                    .antMatchers("/**").authenticated()
                    .anyRequest().permitAll()
                    .and()
                    .exceptionHandling().authenticationEntryPoint(new Pac4jEntryPoint(config, "CasClient"))
                    .and()
                    .addFilterBefore(callbackFilter, BasicAuthenticationFilter.class)
                    .addFilterBefore(logoutFilter, CallbackFilter.class)
                    .addFilterAfter(centralLogoutFilter, CallbackFilter.class)
                    .csrf().disable()
                    .logout()
                    .logoutSuccessUrl("/");
        }
    }

}
