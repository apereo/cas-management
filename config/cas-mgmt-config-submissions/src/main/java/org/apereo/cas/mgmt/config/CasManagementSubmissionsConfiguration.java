package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.SubmissionController;
import org.apereo.cas.mgmt.SubmissionRequests;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.EmailManager;
import org.apereo.cas.mgmt.factory.RepositoryFactory;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

/**
 * Configuration class for version control.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementSubmissionsConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementSubmissionsConfiguration {

    @Autowired
    @Qualifier("repositoryFactory")
    private ObjectProvider<RepositoryFactory> repositoryFactory;

    @Autowired
    @Qualifier("managerFactory")
    private ObjectProvider<MgmtManagerFactory> managerFactory;

    @Autowired
    @Qualifier("managementProperties")
    private ObjectProvider<CasManagementConfigurationProperties> managementProperties;

    @Autowired
    @Qualifier("casUserProfileFactory")
    private ObjectProvider<CasUserProfileFactory> casUserProfileFactory;

    @Autowired
    @Qualifier("emailManager")
    private ObjectProvider<EmailManager> emailManager;

    @Bean
    public SubmissionController submissionController() {
        return new SubmissionController(repositoryFactory.getIfAvailable(),
                managerFactory.getIfAvailable(),
                managementProperties.getIfAvailable(),
                casUserProfileFactory.getIfAvailable(),
                emailManager.getIfAvailable());
    }

    @Bean
    public SubmissionRequests submissionRequests() {
        return () -> {
            try(Stream submissions = Files.list(Paths.get(managementProperties.getIfAvailable().getSubmissions().getSubmitDir()))) {
                return (int) submissions.count();
            } catch (final Exception e) {
                return 0;
            }
        };
    }
}
