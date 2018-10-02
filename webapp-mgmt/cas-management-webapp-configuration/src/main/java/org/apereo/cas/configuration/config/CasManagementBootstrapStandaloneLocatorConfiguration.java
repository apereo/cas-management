package org.apereo.cas.configuration.config;

import org.apereo.cas.CipherExecutor;
import org.apereo.cas.configuration.CasConfigurationPropertiesEnvironmentManager;
import org.apereo.cas.configuration.DefaultCasConfigurationPropertiesSourceLocator;
import org.apereo.cas.configuration.api.CasConfigurationPropertiesSourceLocator;
import org.apereo.cas.configuration.support.CasConfigurationJasyptCipherExecutor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationPropertiesBindingPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

/**
 * This is {@link CasManagementBootstrapStandaloneLocatorConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.3.0
 */
@Profile("standalone")
@ConditionalOnProperty(value = "spring.cloud.config.enabled", havingValue = "false")
@Configuration("casManagementBootstrapStandaloneLocatorConfiguration")
@Slf4j
public class CasManagementBootstrapStandaloneLocatorConfiguration {

    @Autowired
    private ConfigurationPropertiesBindingPostProcessor binder;

    @Autowired
    private Environment environment;

    @ConditionalOnMissingBean(name = "casManagementConfigurationPropertiesSourceLocator")
    @Bean
    public CasConfigurationPropertiesSourceLocator casManagementConfigurationPropertiesSourceLocator() {
        return new DefaultCasConfigurationPropertiesSourceLocator(casManagementConfigurationCipherExecutor(),
            casManagementConfigurationPropertiesEnvironmentManager());
    }

    @ConditionalOnMissingBean(name = "casManagementConfigurationCipherExecutor")
    @Bean
    public CipherExecutor<String, String> casManagementConfigurationCipherExecutor() {
        return new CasConfigurationJasyptCipherExecutor(environment);
    }

    @ConditionalOnMissingBean(name = "casManagementConfigurationPropertiesEnvironmentManager")
    @Bean
    public CasConfigurationPropertiesEnvironmentManager casManagementConfigurationPropertiesEnvironmentManager() {
        return new CasConfigurationPropertiesEnvironmentManager(binder, environment);
    }
}
