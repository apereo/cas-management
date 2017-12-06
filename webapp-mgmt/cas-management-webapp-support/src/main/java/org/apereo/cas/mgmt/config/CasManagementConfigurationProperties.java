package org.apereo.cas.mgmt.config;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.configuration.model.core.CasServerProperties;
import org.apereo.cas.configuration.model.core.authentication.AuthenticationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.configuration.model.webapp.LocaleProperties;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

@ConfigurationProperties("cas")
public class CasManagementConfigurationProperties {


    @NestedConfigurationProperty
    AuthenticationProperties authn = new AuthenticationProperties();

    @NestedConfigurationProperty
    ServiceRegistryProperties serviceRegistry = new ServiceRegistryProperties();

    @NestedConfigurationProperty
    LocaleProperties locale = new LocaleProperties();

    @NestedConfigurationProperty
    CasServerProperties server = new CasServerProperties();

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
