package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.OauthController;
import org.apereo.cas.mgmt.OidcController;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.services.ServicesManager;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *Configuration for register end point features.
 *
 * @author Travis Schmidt
 * @since 5.3.5
 */
@Configuration("casManagementOAuthConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementOauthConfiguration {

    @Autowired
    @Qualifier("managerFactory")
    private ObjectProvider<MgmtManagerFactory> managerFactory;

    @Autowired
    //@Qualifier("managementProperties")
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    @Qualifier("casUserProfileFactory")
    private ObjectProvider<CasUserProfileFactory> casUserProfileFactory;

    @Autowired
    @Qualifier("servicesManager")
    private ServicesManager servicesManager;

    @Bean
    public OauthController oauthController() {
        return new OauthController(casUserProfileFactory.getIfAvailable(),
                managerFactory.getIfAvailable(),
                managementProperties,
                servicesManager);
    }

    @Bean
    public OidcController oidcController() {
        return new OidcController(casUserProfileFactory.getIfAvailable(),
                managerFactory.getIfAvailable(),
                managementProperties,
                servicesManager);
    }
}
