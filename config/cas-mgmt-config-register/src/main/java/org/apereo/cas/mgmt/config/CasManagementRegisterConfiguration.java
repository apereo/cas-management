package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.BulkActionController;
import org.apereo.cas.mgmt.RegisterController;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.services.ServicesManager;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *Configuration for register end point features.
 *
 * @author Travis Schmidt
 * @since 5.3.5
 */
@Configuration("casManagementRegisterConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementRegisterConfiguration {

    @Autowired
    private RepositoryFactory repositoryFactory;

    @Autowired
    private VersionControlManagerFactory managerFactory;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    private CasUserProfileFactory casUserProfileFactory;

    @Autowired
    private EmailManager emailManager;

    @Autowired
    private ServicesManager servicesManager;

    @Bean
    public RegisterController registerController() {
        return new RegisterController(casUserProfileFactory, managerFactory,
                managementProperties, emailManager, servicesManager);
    }

    @Bean
    public BulkActionController bulkActionController() {
        return new BulkActionController(casUserProfileFactory, managerFactory, managementProperties,
                repositoryFactory, emailManager);
    }

}
