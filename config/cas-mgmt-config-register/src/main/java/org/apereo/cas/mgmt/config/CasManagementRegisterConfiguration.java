package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.BulkActionController;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.RegisterController;
import org.apereo.cas.mgmt.RegisterForwardingController;
import org.apereo.cas.mgmt.VersionControlServicesManager;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.services.ServicesManager;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *Configuration for register end point features.
 *
 * @author Travis Schmidt
 * @since 5.3.5
 */
@ConditionalOnProperty(prefix = "mgmt.register", name = "enabled", havingValue = "true")
@Configuration("casManagementRegisterConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementRegisterConfiguration {

    @Autowired
    @Qualifier("repositoryFactory")
    private ObjectProvider<RepositoryFactory> repositoryFactory;

    @Autowired
    @Qualifier("managerFactory")
    private ObjectProvider<VersionControlManagerFactory> managerFactory;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    @Qualifier("casUserProfileFactory")
    private ObjectProvider<CasUserProfileFactory> casUserProfileFactory;

    @Autowired
    @Qualifier("emailManager")
    private ObjectProvider<EmailManager> emailManager;

    @Autowired
    @Qualifier("servicesManager")
    private ObjectProvider<ServicesManager> servicesManager;

    @Bean
    public RegisterController registerController() {
        return new RegisterController(casUserProfileFactory.getIfAvailable(),
                managerFactory.getIfAvailable(),
                managementProperties,
                emailManager.getIfAvailable(),
                servicesManager.getIfAvailable());
    }


    @Bean
    public BulkActionController bulkActionController() {
        return new BulkActionController(casUserProfileFactory.getIfAvailable(),
                (VersionControlManagerFactory) managerFactory.getIfAvailable(),
                managementProperties,
                repositoryFactory.getIfAvailable(),
                emailManager.getIfAvailable());
    }

    @Bean(name = "registerForwarding")
    public RegisterForwardingController registerForwardingController() {
        return new RegisterForwardingController();
    }

}
