package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.LuceneSearch;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for Lucene search.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementSearch")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementSearchConfiguration {

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    private MgmtManagerFactory mgmtManagerFactory;

    @Autowired
    private CasUserProfileFactory casUserProfileFactory;

    @Bean
    public LuceneSearch luceneSearch() {
        return new LuceneSearch(mgmtManagerFactory, casUserProfileFactory, managementProperties);
    }
}
