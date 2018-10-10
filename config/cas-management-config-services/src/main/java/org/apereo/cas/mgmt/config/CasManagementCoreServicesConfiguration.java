package org.apereo.cas.mgmt.config;

import org.apereo.cas.authentication.principal.ServiceFactory;
import org.apereo.cas.authentication.principal.WebApplicationService;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.ApplicationDataController;
import org.apereo.cas.mgmt.controller.DomainController;
import org.apereo.cas.mgmt.controller.ServiceController;
import org.apereo.cas.mgmt.controller.ViewController;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.mgmt.factory.ServicesManagerFactory;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.ServicesManager;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for core services.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementCoreServicesConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
@Slf4j
public class CasManagementCoreServicesConfiguration {

    @Autowired
    private ServerProperties serverProperties;

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    @Qualifier("servicesManager")
    private ServicesManager servicesManager;

    @Autowired
    @Qualifier("webApplicationServiceFactory")
    private ServiceFactory<WebApplicationService> webApplicationServiceFactory;

    @Autowired
    private CasUserProfileFactory casUserProfileFactory;

    @Autowired
    @Qualifier("managerFactory")
    private ServicesManagerFactory managerFactory;

    @Autowired
    @Qualifier("formDataFactory")
    private FormDataFactory formDataFactory;

    @Bean
    public ApplicationDataController manageRegisteredServicesMultiActionController() {
        return new ApplicationDataController(formDataFactory, casUserProfileFactory, managerFactory,
                managementProperties, casProperties);
    }

    @Bean
    public ServiceController serviceController() {
        return new ServiceController(casUserProfileFactory, managerFactory);
    }

    @Bean
    public DomainController domainController() {
        return new DomainController(formDataFactory, casUserProfileFactory, managerFactory, managementProperties,
                casProperties);
    }

    @Bean
    public ViewController viewController() {
        val defaultCallbackUrl = CasManagementUtils.getDefaultCallbackUrl(casProperties, serverProperties);
        return new ViewController(webApplicationServiceFactory.createService(defaultCallbackUrl));
    }

}
