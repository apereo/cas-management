package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.CommitStatus;
import org.apereo.cas.mgmt.PendingRequests;
import org.apereo.cas.mgmt.authentication.CasUserProfile;
import org.apereo.cas.mgmt.controller.DelegatedUtil;
import org.apereo.cas.mgmt.controller.NoteController;
import org.apereo.cas.mgmt.controller.PullController;
import org.apereo.cas.mgmt.controller.SubmitController;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.notifications.CommunicationsManager;
import lombok.val;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import java.util.EnumSet;
import java.util.Objects;

/**
 * Configuration class for version control.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@AutoConfiguration
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@ConditionalOnProperty(prefix = "mgmt.delegated", name = "enabled", havingValue = "true")
public class CasManagementDelegatedConfiguration {

    @Bean
    public SubmitController submitController(
        final CasManagementConfigurationProperties managementProperties,
        @Qualifier(CommunicationsManager.BEAN_NAME)
        final CommunicationsManager communicationsManager,
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return new SubmitController(repositoryFactory,
            managementProperties, communicationsManager);
    }

    @Bean
    public PullController pullController(
        final CasManagementConfigurationProperties managementProperties,
        @Qualifier(CommunicationsManager.BEAN_NAME)
        final CommunicationsManager communicationsManager,
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return new PullController(repositoryFactory,
            managementProperties, communicationsManager);
    }

    @Bean
    public NoteController noteController(
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return new NoteController(repositoryFactory);
    }

    @Bean
    public PendingRequests pendingRequests(
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory) {
        return authentication -> {
            val user = Objects.requireNonNull(CasUserProfile.from(authentication));
            if (user.isAdministrator()) {
                val git = Objects.requireNonNull(repositoryFactory).masterRepository();
                try {
                    return (int) git.branches()
                        .map(git::mapBranches)
                        .filter(r -> DelegatedUtil.filterPulls(r, EnumSet.of(CommitStatus.SUBMITTED)))
                        .count();
                } catch (final Exception e) {
                    return 0;
                }
            }
            return 0;
        };
    }
}
