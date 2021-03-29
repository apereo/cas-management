package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.PendingRequests;
import org.apereo.cas.mgmt.SubmissionRequests;
import org.apereo.cas.mgmt.VersionControlServicesManager;
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
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
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
    private ConfigurableApplicationContext applicationContext;


    @Autowired
    @Qualifier("casUserProfileFactory")
    private ObjectProvider<CasUserProfileFactory> casUserProfileFactory;

    @Autowired
    @Qualifier("servicesManager")
    private ObjectProvider<ServicesManager> servicesManager;

    @Autowired
    private ObjectProvider<PendingRequests> pendingRequests;

    @Autowired
    private ObjectProvider<SubmissionRequests> submissionRequests;

    @Autowired
    @Qualifier("namingStrategy")
    private ObjectProvider<RegisteredServiceResourceNamingStrategy> namingStrategy;


    @Bean(name = "managerFactory")
    @ConditionalOnProperty(prefix = "mgmt.versionControl", name = "enabled", havingValue = "true")
    public VersionControlManagerFactory managerFactory() {
        return new VersionControlManagerFactory(servicesManager.getIfAvailable(), applicationContext, managementProperties,
                repositoryFactory(), casUserProfileFactory.getIfAvailable(), casProperties, namingStrategy.getIfAvailable());
    }

    @Bean
    @ConditionalOnProperty(prefix = "mgmt.versionControl", name = "enabled", havingValue = "true")
    public RepositoryFactory repositoryFactory() {
        return new RepositoryFactory(managementProperties, casUserProfileFactory.getIfAvailable());
    }

    @Bean
    @ConditionalOnProperty(prefix = "mgmt.versionControl", name = "enabled", havingValue = "true")
    public CommitController commitController() {
        return new CommitController(repositoryFactory(), casUserProfileFactory.getIfAvailable(),
                managementProperties, servicesManager.getIfAvailable(), pendingRequests, submissionRequests);
    }

    @Bean
    @ConditionalOnProperty(prefix = "mgmt.versionControl", name = "enabled", havingValue = "true")
    public ChangeController changeController() {
        return new ChangeController(repositoryFactory(), managerFactory(), casUserProfileFactory.getIfAvailable());
    }

    @Bean
    @ConditionalOnProperty(prefix = "mgmt.versionControl", name = "enabled", havingValue = "true")
    public HistoryController historyController() {
        return new HistoryController(repositoryFactory(), casUserProfileFactory.getIfAvailable());
    }

}
