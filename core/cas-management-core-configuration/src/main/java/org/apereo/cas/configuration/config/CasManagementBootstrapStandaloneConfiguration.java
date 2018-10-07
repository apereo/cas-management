package org.apereo.cas.configuration.config;

import org.apereo.cas.configuration.CommaSeparatedStringToThrowablesConverter;
import org.apereo.cas.configuration.api.CasConfigurationPropertiesSourceLocator;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationPropertiesBinding;
import org.springframework.cloud.bootstrap.config.PropertySourceLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.env.Environment;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.ResourceLoader;

import java.util.List;

/**
 * This is {@link CasManagementBootstrapStandaloneConfiguration}.
 *
 * @author Misagh Moayyed
 * @since 5.1.0
 */
@Profile("standalone")
@ConditionalOnProperty(value = "spring.cloud.config.enabled", havingValue = "false")
@Configuration("casManagementBootstrapStandaloneConfiguration")
@AutoConfigureAfter(CasManagementBootstrapStandaloneLocatorConfiguration.class)
@Slf4j
public class CasManagementBootstrapStandaloneConfiguration implements PropertySourceLocator, PriorityOrdered {

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private CasConfigurationPropertiesSourceLocator casConfigurationPropertiesSourceLocator;

    @ConfigurationPropertiesBinding
    @Bean
    public Converter<String, List<Class<? extends Throwable>>> casManagementCommaSeparatedStringToThrowablesCollection() {
        return new CommaSeparatedStringToThrowablesConverter();
    }

    @Override
    public PropertySource<?> locate(final Environment environment) {
        return casConfigurationPropertiesSourceLocator.locate(environment, this.resourceLoader);
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }
}
