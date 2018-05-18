package org.apereo.cas.configuration;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apereo.cas.configuration.model.core.CasServerProperties;
import org.apereo.cas.configuration.model.core.authentication.AuthenticationProperties;
import org.apereo.cas.configuration.model.core.authentication.HttpClientProperties;
import org.apereo.cas.configuration.model.core.services.ServiceRegistryProperties;
import org.apereo.cas.configuration.model.core.standalone.StandaloneConfigurationProperties;
import org.apereo.cas.configuration.model.webapp.LocaleProperties;
import org.apereo.cas.configuration.model.ManagementWebappProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.io.Serializable;

/**
 * Configuration class used to read values from congigured properties files.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@ConfigurationProperties(value = "cas", ignoreUnknownFields = false)
@Slf4j
@Getter
@Setter
public class CasConfigurationProperties implements Serializable {
    private static final long serialVersionUID = -2686426966125636166L;

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

    /**
     * Http.
     */
    @NestedConfigurationProperty
    private HttpClientProperties httpClient = new HttpClientProperties();

    /**
     * Standalone configuration settings.
     */
    @NestedConfigurationProperty
    private StandaloneConfigurationProperties standalone = new StandaloneConfigurationProperties();

}
