package org.apereo.cas.mgmt.configuration;

import org.apereo.cas.configuration.model.core.CasServerProperties;
import org.apereo.cas.configuration.model.core.authentication.AuthenticationProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.configuration.model.webapp.LocaleProperties;
import org.apereo.cas.mgmt.configuration.model.ManagementWebappProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

/**
 * Class used to configure properties for management app.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@ConfigurationProperties("cas")
public class CasManagementConfigurationProperties {
    /**
       Authentication.
     */
    @NestedConfigurationProperty
    private AuthenticationProperties authn = new AuthenticationProperties();

    /**
     * ServiceRegistry.
     */
    @NestedConfigurationProperty
    private ServiceRegistryProperties serviceRegistry = new ServiceRegistryProperties();

    /**
     * Locale.
     */
    @NestedConfigurationProperty
    private LocaleProperties locale = new LocaleProperties();

    /**
     * Sever.
     */
    @NestedConfigurationProperty
    private CasServerProperties server = new CasServerProperties();

    /**
     * Management.
     */
    @NestedConfigurationProperty
    private ManagementWebappProperties mgmt = new ManagementWebappProperties();

    public ManagementWebappProperties getMgmt() {
        return mgmt;
    }

    public void setMgmt(final ManagementWebappProperties mgmt) {
        this.mgmt = mgmt;
    }

    public AuthenticationProperties getAuthn() {
        return authn;
    }

    public void setAuthn(final AuthenticationProperties authn) {
        this.authn = authn;
    }

    public ServiceRegistryProperties getServiceRegistry() {
        return serviceRegistry;
    }

    public void setServiceRegistry(final ServiceRegistryProperties serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public LocaleProperties getLocale() {
        return locale;
    }

    public void setLocale(final LocaleProperties locale) {
        this.locale = locale;
    }

    public CasServerProperties getServer() {
        return server;
    }

    public void setServer(final CasServerProperties server) {
        this.server = server;
    }

}
