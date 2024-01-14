package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.BulkActionController;
import org.apereo.cas.mgmt.RegisterController;
import org.apereo.cas.mgmt.RegisterForwardingController;
import org.apereo.cas.mgmt.RegisterViewController;
import org.apereo.cas.mgmt.factory.RepositoryFactory;
import org.apereo.cas.mgmt.factory.VersionControlManagerFactory;
import org.apereo.cas.notifications.CommunicationsManager;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.util.CollectionUtils;

import lombok.val;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;

import java.nio.charset.StandardCharsets;

/**
 * Configuration for register end point features.
 *
 * @author Travis Schmidt
 * @since 5.3.5
 */
@AutoConfiguration
@ConditionalOnProperty(prefix = "mgmt.register", name = "enabled", havingValue = "true")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementRegisterConfiguration {

    @Bean
    public RegisterViewController registerViewController() {
        return new RegisterViewController();
    }

    @Bean
    public RegisterController registerController(
        final CasManagementConfigurationProperties managementProperties,
        @Qualifier("managerFactory")
        final VersionControlManagerFactory managerFactory,
        @Qualifier(CommunicationsManager.BEAN_NAME)
        final CommunicationsManager communicationsManager,
        @Qualifier(ServicesManager.BEAN_NAME)
        final ServicesManager servicesManager) {
        return new RegisterController(
            managerFactory,
            managementProperties,
            communicationsManager,
            servicesManager);
    }

    @Bean
    public BulkActionController bulkActionController(
        final CasManagementConfigurationProperties managementProperties,
        @Qualifier("repositoryFactory")
        final RepositoryFactory repositoryFactory,
        @Qualifier("managerFactory")
        final VersionControlManagerFactory managerFactory,
        @Qualifier(CommunicationsManager.BEAN_NAME)
        final CommunicationsManager communicationsManager) {
        return new BulkActionController(
            managerFactory,
            managementProperties,
            repositoryFactory,
            communicationsManager);
    }

    @Bean(name = "registerForwarding")
    public RegisterForwardingController registerForwardingController() {
        return new RegisterForwardingController();
    }

    @Bean
    SpringResourceTemplateResolver staticTemplateResolver(final ConfigurableApplicationContext applicationContext) {
        val resolver = new SpringResourceTemplateResolver();
        resolver.setApplicationContext(applicationContext);
        resolver.setPrefix("classpath:/dist/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode("HTML");
        resolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
        resolver.setCacheable(false);
        resolver.setOrder(1);
        resolver.setCheckExistence(true);
        resolver.setResolvablePatterns(CollectionUtils.wrapHashSet("register/**"));
        return resolver;
    }

}
