package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.support.Beans;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.mgmt.factory.ServicesManagerFactory;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.DefaultRegisteredServiceResourceNamingStrategy;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;

import lombok.extern.slf4j.Slf4j;

import org.apereo.services.persondir.IPersonAttributeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for factory.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementFactoryConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementFactoryConfiguration {

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    @Qualifier("servicesManager")
    private ServicesManager servicesManager;

    @Bean
    @ConditionalOnMissingBean(name = "managerFactory")
    public ServicesManagerFactory managerFactory() {
        return new ServicesManagerFactory(servicesManager);
    }

    @Bean
    public FormDataFactory formDataFactory() {
        return new FormDataFactory(casProperties, managementProperties, attributeRepository());
    }

    @ConditionalOnMissingBean(name = "attributeRepository")
    @Bean
    public IPersonAttributeDao attributeRepository() {
        return Beans.newStubAttributeRepository(casProperties.getAuthn().getAttributeRepository());
    }

    @ConditionalOnMissingBean
    @Bean
    public RegisteredServiceResourceNamingStrategy namingStrategy() {
        return new DefaultRegisteredServiceResourceNamingStrategy();
    }
}
