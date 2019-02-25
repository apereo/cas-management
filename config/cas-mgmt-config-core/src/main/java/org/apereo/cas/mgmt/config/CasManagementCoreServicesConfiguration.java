package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.CasManagementConfigurationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.configuration.support.Beans;
import org.apereo.cas.mgmt.ContactLookup;
import org.apereo.cas.mgmt.MgmtManagerFactory;
import org.apereo.cas.mgmt.NoOpContactLookup;
import org.apereo.cas.mgmt.authentication.CasUserProfileFactory;
import org.apereo.cas.mgmt.controller.ApplicationDataController;
import org.apereo.cas.mgmt.controller.ContactLookupController;
import org.apereo.cas.mgmt.controller.DomainController;
import org.apereo.cas.mgmt.controller.ServiceController;
import org.apereo.cas.mgmt.factory.FormDataFactory;
import org.apereo.cas.mgmt.factory.ServicesManagerFactory;
import org.apereo.cas.services.DefaultServicesManager;
import org.apereo.cas.services.DomainServicesManager;
import org.apereo.cas.services.JsonServiceRegistry;
import org.apereo.cas.services.ServicesManager;
import org.apereo.cas.services.resource.DefaultRegisteredServiceResourceNamingStrategy;
import org.apereo.cas.services.resource.RegisteredServiceResourceNamingStrategy;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.apereo.services.persondir.IPersonAttributeDao;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
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
@Slf4j
public class CasManagementCoreServicesConfiguration {

    @Autowired
    private CasConfigurationProperties casProperties;

    @Autowired
    private CasManagementConfigurationProperties managementProperties;


    @Autowired
    @Qualifier("casUserProfileFactory")
    private ObjectProvider<CasUserProfileFactory> casUserProfileFactory;

    /*
    @Autowired
    @Qualifier("servicesManager")
    private ObjectProvider<ServicesManager> servicesManager;
    */

    @Bean
    @ConditionalOnMissingBean(name = "managerFactory")
    public MgmtManagerFactory managerFactory() {
        return new ServicesManagerFactory(servicesManager(), namingStrategy());
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

    @ConditionalOnMissingBean(name = "namingStrategy")
    @Bean
    public RegisteredServiceResourceNamingStrategy namingStrategy() {
        return new DefaultRegisteredServiceResourceNamingStrategy();
    }
    @Bean
    public ApplicationDataController applicationDataController() {
        return new ApplicationDataController(formDataFactory(), casUserProfileFactory.getIfAvailable(), managerFactory(),
                managementProperties, casProperties, contactLookup());
    }

    @Bean
    public ServiceController serviceController() {
        return new ServiceController(casUserProfileFactory.getIfAvailable(), managerFactory());
    }

    @Bean
    public DomainController domainController() {
        return new DomainController(casUserProfileFactory.getIfAvailable(), managerFactory());
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

    @SneakyThrows
    private ServicesManager servicesManager() {
        val path = casProperties.getServiceRegistry().getJson().getLocation().getFile().toPath();

        val serviceRegistryDAO = new JsonServiceRegistry(path,
                false, null, null, namingStrategy());
        val manager = (ServicesManager) (casProperties.getServiceRegistry().getManagementType() == ServiceRegistryProperties.ServiceManagementTypes.DOMAIN
                ? new DomainServicesManager(serviceRegistryDAO, null, new HashSet<>())
                : new DefaultServicesManager(serviceRegistryDAO, null, new HashSet<>()));
        manager.load();
        return manager;
    }
}
