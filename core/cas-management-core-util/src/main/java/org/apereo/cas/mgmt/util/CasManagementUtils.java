package org.apereo.cas.mgmt.util;

import org.apereo.cas.configuration.CasConfigurationProperties;
import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.util.DefaultRegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;

import lombok.extern.slf4j.Slf4j;
import lombok.val;

import org.springframework.beans.factory.BeanCreationException;
import org.springframework.boot.autoconfigure.web.ServerProperties;

import java.io.ByteArrayOutputStream;

/**
 * This is {@link CasManagementUtils}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
@Slf4j
public final class CasManagementUtils {

    private static final DefaultRegisteredServiceJsonSerializer JSON_SERIALIZER = new DefaultRegisteredServiceJsonSerializer();
    private static final RegisteredServiceYamlSerializer YAML_SERIALIZER = new RegisteredServiceYamlSerializer();

    private CasManagementUtils() {
    }

    /**
     * Gets default callback url.
     *
     * @param casProperties    the cas properties
     * @param serverProperties the server properties
     * @return the default callback url
     */
    public static String getDefaultCallbackUrl(final CasConfigurationProperties casProperties, final ServerProperties serverProperties) {
        try {
            return casProperties.getServer().getName().concat(serverProperties.getServlet().getContextPath()).concat("/manage.html");
        } catch (final Exception e) {
            throw new BeanCreationException(e.getMessage(), e);
        }
    }

    /**
     * @return Return the full CAS mgmt version string.
     * @see java.lang.Package#getImplementationVersion
     */
    public static String getVersion() {
        return CasManagementUtils.class.getPackage().getImplementationVersion();
    }

    /**
     * Gets specification version from the manifest package.
     *
     * @return the specification version
     */
    public static String getSpecificationVersion() {
        return CasManagementUtils.class.getPackage().getSpecificationVersion();
    }

    /**
     * Returns service as yaml string.
     *
     * @param service - the service
     * @return - yaml
     */
    public static String toYaml(final RegisteredService service) {
        val output = new ByteArrayOutputStream();
        YAML_SERIALIZER.to(output, service);
        return output.toString();
    }

    /**
     * Returns service as json string.
     *
     * @param service - the service
     * @return - json
     */
    public static String toJson(final RegisteredService service) {
        val output = new ByteArrayOutputStream();
        JSON_SERIALIZER.to(output, service);
        return output.toString();
    }

    /**
     * Parses the passed yaml into a RegisteredService.
     *
     * @param yaml - the yaml
     * @return - RegisteredService
     */
    public static RegisteredService fromYaml(final String yaml) {
        return YAML_SERIALIZER.from(yaml);
    }

    /**
     * Parses the passed json into a RegisteredService.
     * @param json - the json
     * @return - RegisteredService
     */
    public static RegisteredService fromJson(final String json) {
        return JSON_SERIALIZER.from(json);
    }

}
