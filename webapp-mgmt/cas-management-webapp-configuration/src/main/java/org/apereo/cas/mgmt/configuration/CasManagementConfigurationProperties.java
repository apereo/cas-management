package org.apereo.cas.mgmt.configuration;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.model.core.CasServerProperties;
import org.apereo.cas.configuration.model.core.authentication.AuthenticationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.configuration.model.webapp.LocaleProperties;
import org.apereo.cas.mgmt.configuration.model.ManagementWebappProperties;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

@ConfigurationProperties("cas")
public class CasManagementConfigurationProperties {
    /**
       Authentication
     */
    @NestedConfigurationProperty
    AuthenticationProperties authn = new AuthenticationProperties();

    /**
     * ServiceRegistry
     */
    @NestedConfigurationProperty
    ServiceRegistryProperties serviceRegistry = new ServiceRegistryProperties();

    /**
     * Locale
     */
    @NestedConfigurationProperty
    LocaleProperties locale = new LocaleProperties();

    /**
     * Sever
     */
    @NestedConfigurationProperty
    CasServerProperties server = new CasServerProperties();

    /**
     * Management
     */
    @NestedConfigurationProperty
    ManagementWebappProperties mgmt = new ManagementWebappProperties();

    public ManagementWebappProperties getMgmt() {
        return mgmt;
    }

    public void setMgmt(ManagementWebappProperties mgmt) {
        this.mgmt = mgmt;
    }

    public AuthenticationProperties getAuthn() {
        return authn;
    }

    public void setAuthn(AuthenticationProperties authn) {
        this.authn = authn;
    }

    public ServiceRegistryProperties getServiceRegistry() {
        return serviceRegistry;
    }

    public void setServiceRegistry(ServiceRegistryProperties serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public LocaleProperties getLocale() {
        return locale;
    }

    public void setLocale(LocaleProperties locale) {
        this.locale = locale;
    }

    public CasServerProperties getServer() {
        return server;
    }

    public void setServer(CasServerProperties server) {
        this.server = server;
    }

}
