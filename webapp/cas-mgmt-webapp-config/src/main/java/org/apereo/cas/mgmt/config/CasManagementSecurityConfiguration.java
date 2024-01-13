package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import lombok.val;
import org.pac4j.core.authorization.authorizer.Authorizer;
import org.pac4j.core.client.Client;
import org.pac4j.core.client.Clients;
import org.pac4j.core.config.Config;
import org.pac4j.core.matching.matcher.PathMatcher;
import org.pac4j.springframework.annotation.AnnotationConfig;
import org.pac4j.springframework.component.ComponentConfig;
import org.pac4j.springframework.web.SecurityInterceptor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.List;

/**
 * Configures security adapters for CAS Management.
 *
 * @author Travis Schmidt
 * @since 6.3.3
 */
@Configuration(value = "casManagementSecurityConfiguration", proxyBeanMethods = false)
@EnableWebSecurity
@EnableConfigurationProperties({CasConfigurationProperties.class,
    ServerProperties.class,
    CasManagementConfigurationProperties.class})
@Import({ComponentConfig.class, AnnotationConfig.class})
@ComponentScan(basePackages = "org.pac4j.springframework.web")
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
        @Qualifier("managementWebappAuthorizer") final Authorizer managementWebappAuthorizer,
        final CasManagementConfigurationProperties managementProperties) {
        var defaultCallbackUrl = getDefaultCallbackUrl(serverProperties, managementProperties);
        val cfg = new Config(new Clients(defaultCallbackUrl, authenticationClients));
        cfg.addAuthorizer("mgmtAuthorizer", managementWebappAuthorizer);
        cfg.addMatcher("excludedPath", new PathMatcher().excludeRegex("^/.*\\.(css|png|ico)$"));
        return cfg;
    }

    @Bean
    public WebMvcConfigurer managementWebMvcConfigurer(
        final CasManagementConfigurationProperties mgmtProperties,
        @Qualifier("pac4jClientConfiguration") final Config config) {
        return new WebMvcConfigurer() {
            @Override
            public void addInterceptors(final InterceptorRegistry registry) {
                registry.addInterceptor(new SecurityInterceptor(config)).addPathPatterns("/**");
            }
        };
    }

    @Bean
    public SecurityFilterChain springSecurityFilterChain(final HttpSecurity http,
                                                         @Qualifier("pac4jClientConfiguration") final Config config,
                                                         final CasManagementConfigurationProperties mgmtProperties) throws Exception {
        http.sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));
        http.csrf(c -> c.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));
        http.headers(c -> c.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));
        http.requiresChannel(c -> c.anyRequest().requiresSecure());
        http.httpBasic(AbstractHttpConfigurer::disable);
        http.formLogin(AbstractHttpConfigurer::disable);
        return http.getObject();
    }
}
