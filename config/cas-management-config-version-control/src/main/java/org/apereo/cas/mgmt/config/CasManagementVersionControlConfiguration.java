package org.apereo.cas.mgmt.config;

import lombok.extern.slf4j.Slf4j;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.ServiceRepositoryController;
import org.apereo.cas.mgmt.factory.ManagerFactory;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.util.io.CommunicationsManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration("casManagementCoreServicesConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementVersionControlConfiguration {

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    private CasUserProfileFactory casUserProfileFactory;

    @Autowired
    private ManagerFactory managerFactory;

    @Autowired
    private ServicesManager servicesManager;

    @Autowired
    @Qualifier("communicationsManager")
    private CommunicationsManager communicationsManager;

    @RefreshScope
    @Bean
    public RepositoryFactory repositoryFactory() {
        return new RepositoryFactory(managementProperties, casUserProfileFactory);
    }

    @Bean
    public ServiceRepositoryController serviceRepositoryController() {
        return new ServiceRepositoryController(repositoryFactory(), managerFactory, casUserProfileFactory,
                managementProperties, servicesManager, communicationsManager);
    }
}
