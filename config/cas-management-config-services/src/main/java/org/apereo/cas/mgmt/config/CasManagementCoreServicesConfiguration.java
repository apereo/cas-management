package org.apereo.cas.mgmt.config;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.RegExUtils;
import org.apereo.cas.authentication.principal.ServiceFactory;
import org.apereo.cas.authentication.principal.WebApplicationService;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.support.Beans;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.mgmt.factory.ManagerFactory;
import org.apereo.cas.mgmt.services.ManageRegisteredServicesMultiActionController;
import org.apereo.cas.mgmt.services.RegisteredServiceSimpleFormController;
import org.apereo.cas.mgmt.util.CasManagementUtils;
import org.apereo.cas.services.ChainingServiceRegistry;
import org.apereo.cas.services.DefaultServiceRegistryExecutionPlan;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.DomainServicesManager;
import org.apereo.cas.services.ImmutableServiceRegistry;
import org.apereo.cas.services.InMemoryServiceRegistry;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServiceRegistry;
import org.apereo.cas.services.ServiceRegistryExecutionPlanConfigurer;
import org.apereo.cas.services.ServicesManager;
import org.apereo.services.persondir.IPersonAttributeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

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


    @Bean
    public ManageRegisteredServicesMultiActionController manageRegisteredServicesMultiActionController(
            @Qualifier("servicesManager") final ServicesManager servicesManager) {
        val defaultCallbackUrl = CasManagementUtils.getDefaultCallbackUrl(casProperties, serverProperties);
        return new ManageRegisteredServicesMultiActionController(servicesManager, formDataFactory(),
                webApplicationServiceFactory, defaultCallbackUrl, managementProperties,
                casUserProfileFactory, managerFactory(), casProperties);
    }

    @Bean
    public RegisteredServiceSimpleFormController registeredServiceSimpleFormController(@Qualifier("servicesManager") final ServicesManager servicesManager) {
        return new RegisteredServiceSimpleFormController(servicesManager, managerFactory(), casUserProfileFactory);
    }

    @RefreshScope
    @Bean
    public ManagerFactory managerFactory() {
        return new ManagerFactory(servicesManager);
    }

    @Bean
    public FormDataFactory formDataFactory() {
        return new FormDataFactory(casProperties, managementProperties, attributeRepository());
    }

    @RefreshScope
    @ConditionalOnMissingBean(name = "attributeRepository")
    @Bean
    public IPersonAttributeDao attributeRepository() {
        return Beans.newStubAttributeRepository(casProperties.getAuthn().getAttributeRepository());
    }
}
