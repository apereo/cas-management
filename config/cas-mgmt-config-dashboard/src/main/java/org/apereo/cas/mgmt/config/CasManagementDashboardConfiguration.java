package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.DashboardController;
import org.apereo.cas.mgmt.DashboardForwardingController;
import org.apereo.cas.mgmt.DashboardViewController;
import org.apereo.cas.mgmt.SessionsController;
import org.apereo.cas.util.CollectionUtils;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;

import java.nio.charset.StandardCharsets;

/**
 * Class used to configure beans used by the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementDashboard")
public class CasManagementDashboardConfiguration {

    @Autowired
    private ApplicationContext context;

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Bean
    public DashboardViewController dashboardViewController() {
        return new DashboardViewController();
    }

    @Bean
    public DashboardController dashboardController() {
        return new DashboardController(managementProperties, casProperties);
    }

    @Bean
    public SessionsController sessionsController() {
        return new SessionsController(managementProperties, casProperties);
    }

    @Bean(name = "dashboardForwarding")
    public DashboardForwardingController dashboardForwardingController() {
        return new DashboardForwardingController();
    }

    @Bean
    SpringResourceTemplateResolver dashboardTemplateResolver() {
        val resolver = new SpringResourceTemplateResolver();
        resolver.setApplicationContext(this.context);
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
