package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.DelegatedController;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.util.io.CommunicationsManager;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for version control.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementDelegatedConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementDelegatedConfiguration {

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    private CasUserProfileFactory casUserProfileFactory;

    @Autowired
    private RepositoryFactory repositoryFactory;

    @Autowired
    @Qualifier("communicationsManager")
    private CommunicationsManager communicationsManager;

    @Bean
    public DelegatedController delegatedController() {
        return new DelegatedController(repositoryFactory, casUserProfileFactory, managementProperties, communicationsManager);
    }
}
