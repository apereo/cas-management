package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.LuceneSearch;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.services.ServicesManager;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for Lucene search.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration(value = "casManagementSearch", proxyBeanMethods = false)
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementSearchConfiguration {

    @Bean
    public LuceneSearch luceneSearch(
        final CasManagementConfigurationProperties managementProperties,
        @Qualifier("managerFactory")
        final MgmtManagerFactory<? extends ServicesManager> managerFactory) {
        return new LuceneSearch(managerFactory, managementProperties);
    }
}
