package org.apereo.cas.mgmt.config;

import org.apereo.cas.authentication.attribute.AttributeDefinitionStore;
import org.apereo.cas.authentication.attribute.DefaultAttributeDefinitionStore;
import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryCoreProperties;
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
import org.apereo.cas.services.ChainingServicesManager;
import org.apereo.cas.services.DefaultChainingServicesManager;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.ServiceRegistry;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.ServicesManagerConfigurationContext;
import org.apereo.cas.services.ServicesManagerRegisteredServiceLocator;
import org.apereo.cas.services.domain.DefaultDomainAwareServicesManager;
import org.apereo.cas.services.domain.DefaultRegisteredServiceDomainExtractor;
import org.apereo.cas.services.resource.DefaultRegisteredServiceResourceNamingStrategy;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;
import org.apereo.cas.support.oauth.services.OAuth20ServicesManagerRegisteredServiceLocator;

import com.github.benmanes.caffeine.cache.Cache;
import lombok.val;
import org.apereo.services.persondir.IPersonAttributeDao;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
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
@Configuration(value = "casManagementCoreServicesConfiguration", proxyBeanMethods = false)
@EnableConfigurationProperties({CasConfigurationProperties.class, CasManagementConfigurationProperties.class})
public class CasManagementCoreServicesConfiguration {

    @ConditionalOnMissingBean(name = "attributeDefinitionStore")
    @Bean
    public AttributeDefinitionStore attributeDefinitionStore(
        final CasConfigurationProperties casProperties) throws Exception {
        val resource = casProperties.getAuthn().getAttributeRepository().getAttributeDefinitionStore().getJson().getLocation();
        val store = new DefaultAttributeDefinitionStore(resource);
        store.setScope(casProperties.getServer().getScope());
        return store;
    }

    @Bean
    @ConditionalOnMissingBean(name = "managerFactory")
    public MgmtManagerFactory<? extends ServicesManager> managerFactory(
        @Qualifier("namingStrategy")
        final RegisteredServiceResourceNamingStrategy namingStrategy,
        @Qualifier("servicesManager")
        final ServicesManager servicesManager) {
        return new ServicesManagerFactory(servicesManager, namingStrategy);
    }

    @Bean
    public FormDataFactory formDataFactory(
        @Qualifier("attributeDefinitionStore")
        final AttributeDefinitionStore attributeDefinitionStore,
        final CasConfigurationProperties casProperties,
        final CasManagementConfigurationProperties managementProperties) {
        return new FormDataFactory(casProperties, managementProperties, attributeDefinitionStore);
    }

    @ConditionalOnMissingBean(name = "attributeRepository")
    @Bean
    public IPersonAttributeDao attributeRepository(final CasConfigurationProperties casProperties) {
        return Beans.newStubAttributeRepository(casProperties.getAuthn().getAttributeRepository());
    }

    @ConditionalOnMissingBean(name = "namingStrategy")
    @Bean
    public RegisteredServiceResourceNamingStrategy namingStrategy() {
        return new DefaultRegisteredServiceResourceNamingStrategy();
    }

    @Bean
    public ApplicationDataController applicationDataController(
        @Qualifier("formDataFactory")
        final FormDataFactory formDataFactory,
        @Qualifier("contactLookup")
        final ContactLookup contactLookup,
        final CasConfigurationProperties casProperties,
        final CasManagementConfigurationProperties managementProperties) {
        return new ApplicationDataController(formDataFactory,
            managementProperties, casProperties, contactLookup);
    }

    @Bean
    public ServiceController serviceController(
        @Qualifier("managerFactory")
        final MgmtManagerFactory<? extends ServicesManager> managerFactory) {
        return new ServiceController(managerFactory);
    }

    @Bean
    public DomainController domainController(
        @Qualifier("managerFactory")
        final MgmtManagerFactory<? extends ServicesManager> managerFactory) {
        return new DomainController(managerFactory);
    }

    @Bean
    public AttributesController attributesController(
        @Qualifier("attributeDefinitionStore")
        final AttributeDefinitionStore attributeDefinitionStore,
        final CasConfigurationProperties casProperties) {
        return new AttributesController(attributeDefinitionStore, casProperties);
    }

    @ConditionalOnMissingBean(name = "contactLookup")
    @Bean
    public ContactLookup contactLookup() {
        return new NoOpContactLookup();
    }

    @Bean
    public ContactLookupController contactLookupController(
        @Qualifier("contactLookup")
        final ContactLookup contactLookup) {
        return new ContactLookupController(contactLookup);
    }


    @Bean(name = "servicesManager")
    public ChainingServicesManager servicesManager(
        @Qualifier("serviceRegistry")
        final ServiceRegistry serviceRegistry,
        final CasConfigurationProperties casProperties,
        final ConfigurableApplicationContext applicationContext,
        @Qualifier("servicesManagerCache")
        final Cache<Long, RegisteredService> servicesManagerCache) {
        val activeProfiles = new HashSet<String>();
        val context = ServicesManagerConfigurationContext.builder()
            .serviceRegistry(serviceRegistry)
            .applicationContext(applicationContext)
            .environments(activeProfiles)
            .servicesCache(servicesManagerCache)
            .build();
        val cm = casProperties.getServiceRegistry().getCore().getManagementType() == ServiceRegistryCoreProperties.ServiceManagementTypes.DOMAIN
            ? new DefaultDomainAwareServicesManager(context, new DefaultRegisteredServiceDomainExtractor())
            : new DefaultServicesManager(context);
        cm.load();
        val chain = new DefaultChainingServicesManager();
        chain.registerServiceManager(cm);
        return chain;
    }

    @Bean(name = "forwarding")
    public ForwardingController forwarding() {
        return new ForwardingController();
    }

    @Bean
    @ConditionalOnMissingBean(name = "oauthServicesManagerRegisteredServiceLocator")
    public ServicesManagerRegisteredServiceLocator oauthServicesManagerRegisteredServiceLocator() {
        return new OAuth20ServicesManagerRegisteredServiceLocator();
    }

}
