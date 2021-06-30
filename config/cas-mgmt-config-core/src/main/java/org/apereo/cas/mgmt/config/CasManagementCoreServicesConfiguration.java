package org.apereo.cas.mgmt.config;

import org.apereo.cas.authentication.attribute.DefaultAttributeDefinitionStore;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.configuration.support.Beans;
import org.apereo.cas.mgmt.ContactLookup;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.NoOpContactLookup;
import org.apereo.cas.mgmt.controller.ApplicationDataController;
import org.apereo.cas.mgmt.controller.AttributesController;
import org.apereo.cas.mgmt.controller.ContactLookupController;
import org.apereo.cas.mgmt.controller.DomainController;
import org.apereo.cas.mgmt.controller.ForwardingController;
import org.apereo.cas.mgmt.controller.ServiceController;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.mgmt.factory.ServicesManagerFactory;
import org.apereo.cas.services.*;
import org.apereo.cas.services.domain.DefaultDomainAwareServicesManager;
import org.apereo.cas.services.domain.DefaultRegisteredServiceDomainExtractor;
import org.apereo.cas.services.resource.DefaultRegisteredServiceResourceNamingStrategy;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;
import org.apereo.cas.support.oauth.services.OAuth20ServicesManagerRegisteredServiceLocator;
import com.github.benmanes.caffeine.cache.Cache;
import lombok.SneakyThrows;
import lombok.val;
import org.apereo.services.persondir.IPersonAttributeDao;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashSet;

/**
 * Configuration class for core services.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Configuration("casManagementCoreServicesConfiguration")
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementCoreServicesConfiguration {

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;

    @Autowired
    private ConfigurableApplicationContext applicationContext;

    @Autowired
    @Qualifier("serviceRegistry")
    private ObjectProvider<ServiceRegistry> serviceRegistry;

    @Autowired
    @Qualifier("servicesManagerCache")
    private ObjectProvider<Cache<Long, RegisteredService>> servicesManagerCache;

    @ConditionalOnMissingBean(name = "attributeDefinitionStore")
    @Bean
    @RefreshScope
    @SneakyThrows
    public DefaultAttributeDefinitionStore attributeDefinitionStore() {
        val resource = casProperties.getPersonDirectory().getAttributeDefinitionStore().getJson().getLocation();
        val store = new DefaultAttributeDefinitionStore(resource);
        store.setScope(casProperties.getServer().getScope());
        return store;
    }

    @Bean
    @ConditionalOnMissingBean(name = "managerFactory")
    public MgmtManagerFactory<? extends ServicesManager> managerFactory() {
        return new ServicesManagerFactory(servicesManager(), namingStrategy());
    }

    @Bean
    public FormDataFactory formDataFactory() {
        return new FormDataFactory(casProperties, managementProperties, attributeDefinitionStore());
    }

    @ConditionalOnMissingBean(name = "attributeRepository")
    @Bean
    public IPersonAttributeDao attributeRepository() {
        return Beans.newStubAttributeRepository(casProperties.getAuthn().getAttributeRepository());
    }

    @ConditionalOnMissingBean(name = "namingStrategy")
    @Bean
    public RegisteredServiceResourceNamingStrategy namingStrategy() {
        return new DefaultRegisteredServiceResourceNamingStrategy();
    }

    @Bean
    public ApplicationDataController applicationDataController() {
        return new ApplicationDataController(formDataFactory(),
                managementProperties, casProperties, contactLookup());
    }

    @Bean
    public ServiceController serviceController() {
        return new ServiceController(managerFactory());
    }

    @Bean
    public DomainController domainController() {
        return new DomainController(managerFactory());
    }

    @Bean
    public AttributesController attributesController() {
        return new AttributesController(attributeDefinitionStore(), casProperties);
    }

    @ConditionalOnMissingBean(name ="contactLookup")
    @Bean
    public ContactLookup contactLookup() {
        return new NoOpContactLookup();
    }

    @Bean
    public ContactLookupController contactLookupController() {
        return new ContactLookupController(contactLookup());
    }


    @Bean(name = "servicesManager")
    @RefreshScope
    public ServicesManager servicesManager() {
        val activeProfiles = new HashSet<String>();
        val context = ServicesManagerConfigurationContext.builder()
                .serviceRegistry(serviceRegistry.getObject())
                .applicationContext(applicationContext)
                .environments(activeProfiles)
                .servicesCache(servicesManagerCache.getObject())
                .build();
        val cm = casProperties.getServiceRegistry().getManagementType() == ServiceRegistryProperties.ServiceManagementTypes.DOMAIN
                ? new DefaultDomainAwareServicesManager(context, new DefaultRegisteredServiceDomainExtractor())
                : new DefaultServicesManager(context);
        cm.load();
        return cm;
    }

    @Bean(name = "forwarding")
    @RefreshScope
    public ForwardingController forwarding() {
        return new ForwardingController();
    }

    @Bean
    @ConditionalOnMissingBean(name = "oauthServicesManagerRegisteredServiceLocator")
    public ServicesManagerRegisteredServiceLocator oauthServicesManagerRegisteredServiceLocator() {
        return new OAuth20ServicesManagerRegisteredServiceLocator();
    }

}
