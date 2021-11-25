package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.PendingRequests;
import org.apereo.cas.mgmt.SubmissionRequests;
import org.apereo.cas.mgmt.controller.ChangeController;
import org.apereo.cas.mgmt.controller.CommitController;
import org.apereo.cas.mgmt.controller.HistoryController;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;

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
@Configuration(value = "CasManagementVersionControlConfiguration", proxyBeanMethods = false)
@ConditionalOnProperty(prefix = "mgmt.version-control", name = "enabled", havingValue = "true")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementVersionControlConfiguration {

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    private ConfigurableApplicationContext applicationContext;

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


    @Bean
    public VersionControlManagerFactory managerFactory(
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return new VersionControlManagerFactory(servicesManager.getObject(),
            applicationContext, managementProperties,
            repositoryFactory, casProperties, namingStrategy.getObject());
    }

    @Bean
    public RepositoryFactory repositoryFactory() {
        return new RepositoryFactory(managementProperties);
    }

    @Bean
    public CommitController commitController(
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return new CommitController(repositoryFactory,
            managementProperties, servicesManager.getObject(),
            pendingRequests, submissionRequests);
    }

    @Bean
    public ChangeController changeController(
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory,
        @Qualifier("managerFactory")
        final VersionControlManagerFactory managerFactory) {
        return new ChangeController(repositoryFactory, managerFactory);
    }

    @Bean
    public HistoryController historyController(
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return new HistoryController(repositoryFactory);
    }

}
