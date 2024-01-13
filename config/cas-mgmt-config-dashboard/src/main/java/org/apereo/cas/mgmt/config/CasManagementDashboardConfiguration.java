package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.DashboardController;
import org.apereo.cas.mgmt.DashboardForwardingController;
import org.apereo.cas.mgmt.DashboardViewController;
import org.apereo.cas.mgmt.SessionsController;
import org.apereo.cas.util.CollectionUtils;
import org.apereo.cas.util.text.MessageSanitizer;

import lombok.val;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;

import java.nio.charset.StandardCharsets;

/**
 * Class used to configure beans used by the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration(value = "casManagementDashboard", proxyBeanMethods = false)
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementDashboardConfiguration {

    @Bean
    public DashboardViewController dashboardViewController() {
        return new DashboardViewController();
    }

    @Bean
    public DashboardController dashboardController(final CasConfigurationProperties casProperties,
                                                   final CasManagementConfigurationProperties managementProperties) {
        return new DashboardController(managementProperties, casProperties);
    }

    @Bean
    public SessionsController sessionsController(final CasConfigurationProperties casProperties,
                                                 final CasManagementConfigurationProperties managementProperties,
                                                 @Qualifier(MessageSanitizer.BEAN_NAME)
                                                 final MessageSanitizer messageSanitizer) {
        return new SessionsController(managementProperties, casProperties, messageSanitizer);
    }

    @Bean(name = "dashboardForwarding")
    public DashboardForwardingController dashboardForwardingController() {
        return new DashboardForwardingController();
    }

    @Bean
    SpringResourceTemplateResolver dashboardTemplateResolver(final ConfigurableApplicationContext applicationContext) {
        val resolver = new SpringResourceTemplateResolver();
        resolver.setApplicationContext(applicationContext);
        resolver.setPrefix("classpath:/dist/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode("HTML");
        resolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
        resolver.setCacheable(false);
        resolver.setOrder(2);
        resolver.setCheckExistence(true);
        resolver.setResolvablePatterns(CollectionUtils.wrapHashSet("dashboard/**"));
        return resolver;
    }

}
