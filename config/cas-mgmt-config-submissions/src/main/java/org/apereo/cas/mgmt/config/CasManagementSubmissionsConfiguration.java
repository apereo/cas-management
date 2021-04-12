package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.SubmissionController;
import org.apereo.cas.mgmt.SubmissionRequests;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.notifications.CommunicationsManager;
import org.apereo.cas.services.ServicesManager;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Configuration class for version control.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementSubmissionsConfiguration")
@ConditionalOnProperty(prefix = "mgmt.version-control", name = "enabled", havingValue = "true")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementSubmissionsConfiguration {

    @Autowired
    @Qualifier("repositoryFactory")
    private ObjectProvider<RepositoryFactory> repositoryFactory;

    @Autowired
    @Qualifier("managerFactory")
    private ObjectProvider<MgmtManagerFactory<? extends ServicesManager>> managerFactory;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    @Qualifier("communicationsManager")
    private ObjectProvider<CommunicationsManager> communicationsManager;

    @Bean
    public SubmissionController submissionController() {
        return new SubmissionController(repositoryFactory.getObject(),
            managerFactory.getObject(),
            managementProperties,
            casProperties,
            communicationsManager.getObject());
    }

    @Bean
    public SubmissionRequests submissionRequests() {
        return () -> {
            try (var submissions = Files.list(Paths.get(managementProperties.getSubmissions().getSubmitDir()))) {
                return (int) submissions.count();
            } catch (final Exception e) {
                return 0;
            }
        };
    }
}
