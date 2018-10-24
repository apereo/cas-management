package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.PendingRequests;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.ChangeController;
import org.apereo.cas.mgmt.controller.CommitController;
import org.apereo.cas.mgmt.controller.HistoryController;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.ObjectProvider;
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
@Configuration("casManagementVersionControlConfiguration")
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
    private ServicesManager servicesManager;

    @Autowired
    private ObjectProvider<PendingRequests> pendingRequests;

    @Autowired
    @Qualifier("namingStrategy")
    private RegisteredServiceResourceNamingStrategy namingStrategy;


    @Bean
    public MgmtManagerFactory managerFactory() {
        return new VersionControlManagerFactory(servicesManager, managementProperties, repositoryFactory(), casUserProfileFactory, casProperties, namingStrategy);
    }

    @Bean
    public RepositoryFactory repositoryFactory() {
        return new RepositoryFactory(managementProperties, casUserProfileFactory);
    }

    @Bean
    public CommitController commitController() {
        return new CommitController(repositoryFactory(), casUserProfileFactory,
                managementProperties, servicesManager, pendingRequests);
    }

    @Bean
    public ChangeController changeController() {
        return new ChangeController(repositoryFactory(), managerFactory(), casUserProfileFactory);
    }

    @Bean
    public HistoryController historyController() {
        return new HistoryController(repositoryFactory(), managerFactory(), casUserProfileFactory);
    }

}
