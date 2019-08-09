package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.DashboardController;
import org.apereo.cas.mgmt.DashboardForwardingController;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;

/**
 * Class used to configure beans used by the /dashboard endpoint.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class CasManagementDashboardConfiguration {

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    @Qualifier("casUserProfileFactory")
    private ObjectProvider<CasUserProfileFactory> casUserProfileFactory;

    @Bean
    public DashboardController dashboardController() {
        return new DashboardController(casUserProfileFactory.getIfAvailable(), managementProperties, casProperties);
    }

    @Bean(name = "dashboardForwarding")
    public DashboardForwardingController dashboardForwardingController() {
        return new DashboardForwardingController();
    }


}
