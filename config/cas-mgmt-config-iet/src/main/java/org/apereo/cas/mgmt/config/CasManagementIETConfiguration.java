package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.ContactLookup;
import org.apereo.cas.mgmt.DefaultContactLookup;
import org.apereo.cas.mgmt.controller.ContactLookupController;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;
import org.apereo.cas.util.LdapUtils;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class to provide IET Specific overrides.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementIETConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementIETConfiguration {

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Bean(name = "namingStrategy")
    public RegisteredServiceResourceNamingStrategy namingStrategy() {
        return (service, extension) -> "service-" + service.getId() + "." + extension;
    }

    @Bean
    public ContactLookup contactLookup() {
        val connectionFactory = LdapUtils.newLdaptivePooledConnectionFactory(managementProperties.getLdapAuth());
        return new DefaultContactLookup(connectionFactory);
    }

}
