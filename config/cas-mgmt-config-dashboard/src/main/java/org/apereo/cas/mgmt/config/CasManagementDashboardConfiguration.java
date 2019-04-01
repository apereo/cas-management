package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.DashboardController;
import org.apereo.cas.mgmt.SessionsController;
import org.apereo.cas.mgmt.TokensController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

/**
 * Class used to configure beans used by the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class CasManagementDashboardConfiguration {

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Bean
    public DashboardController dashboardController() {
        return new DashboardController(managementProperties);
    }

    @Bean
    public SessionsController sessionsController() {
        return new SessionsController(managementProperties);
    }

    @Bean
    public TokensController tokensController() {
        return new TokensController(managementProperties);
    }
}
