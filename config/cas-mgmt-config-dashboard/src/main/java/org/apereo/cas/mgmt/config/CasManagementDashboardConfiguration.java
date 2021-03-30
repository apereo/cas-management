package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.DashboardController;
import org.apereo.cas.mgmt.DashboardForwardingController;
import org.apereo.cas.mgmt.SessionsController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Class used to configure beans used by the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementDashboard")
public class CasManagementDashboardConfiguration {

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

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


}
