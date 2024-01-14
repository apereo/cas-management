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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

/**
 * Configuration class for version control.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@AutoConfiguration
@ConditionalOnProperty(prefix = "mgmt.version-control", name = "enabled", havingValue = "true")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementVersionControlConfiguration {

    @Bean
    public VersionControlManagerFactory managerFactory(
        @Qualifier("servicesManager")
        final ServicesManager servicesManager,
        @Qualifier("namingStrategy")
        final RegisteredServiceResourceNamingStrategy namingStrategy,
        final ConfigurableApplicationContext applicationContext,
        final CasConfigurationProperties casProperties,
        final CasManagementConfigurationProperties managementProperties,
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return new VersionControlManagerFactory(servicesManager,
            applicationContext, managementProperties,
            repositoryFactory, casProperties, namingStrategy);
    }

    @Bean
    public RepositoryFactory repositoryFactory(final CasManagementConfigurationProperties managementProperties) {
        return new RepositoryFactory(managementProperties);
    }

    @Bean
    public CommitController commitController(
        final ObjectProvider<SubmissionRequests> submissionRequests,
        final ObjectProvider<PendingRequests> pendingRequests,
        @Qualifier("servicesManager")
        final ServicesManager servicesManager,
        final CasManagementConfigurationProperties managementProperties,
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return new CommitController(repositoryFactory,
            managementProperties, servicesManager,
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
