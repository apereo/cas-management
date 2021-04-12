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
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;

import java.nio.charset.StandardCharsets;

/**
 * Configuration for register end point features.
 *
 * @author Travis Schmidt
 * @since 5.3.5
 */
@ConditionalOnProperty(prefix = "mgmt.register", name = "enabled", havingValue = "true")
@Configuration("casManagementRegisterConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementRegisterConfiguration {

    @Autowired
    private ApplicationContext context;

    @Autowired
    @Qualifier("repositoryFactory")
    private ObjectProvider<RepositoryFactory> repositoryFactory;

    @Autowired
    @Qualifier("managerFactory")
    private ObjectProvider<VersionControlManagerFactory> managerFactory;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    @Qualifier("communicationsManager")
    private ObjectProvider<CommunicationsManager> communicationsManager;

    @Autowired
    @Qualifier("servicesManager")
    private ObjectProvider<ServicesManager> servicesManager;

    @Bean
    public RegisterViewController registerViewController() {
        return new RegisterViewController();
    }

    @Bean
    public RegisterController registerController() {
        return new RegisterController(
            managerFactory.getObject(),
            managementProperties,
            communicationsManager.getObject(),
            servicesManager.getObject());
    }

    @Bean
    public BulkActionController bulkActionController() {
        return new BulkActionController(
            (VersionControlManagerFactory) managerFactory.getObject(),
            managementProperties,
            repositoryFactory.getObject(),
            communicationsManager.getObject());
    }

    @Bean(name = "registerForwarding")
    public RegisterForwardingController registerForwardingController() {
        return new RegisterForwardingController();
    }

    @Bean
    SpringResourceTemplateResolver staticTemplateResolver() {
        val resolver = new SpringResourceTemplateResolver();
        resolver.setApplicationContext(this.context);
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
