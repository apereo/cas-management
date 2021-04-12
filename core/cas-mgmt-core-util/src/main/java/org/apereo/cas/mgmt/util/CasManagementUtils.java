package org.apereo.cas.mgmt.util;

import org.apereo.cas.services.RegisteredService;
import org.apereo.cas.services.util.RegisteredServiceJsonSerializer;
import org.apereo.cas.services.util.RegisteredServiceYamlSerializer;
import org.apereo.cas.util.RegexUtils;

import com.fasterxml.jackson.databind.DeserializationFeature;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.hjson.JsonValue;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.regex.Pattern;

/**
 * This is {@link CasManagementUtils}.
 *
 * @author Misagh Moayyed
 * @since 5.2.0
 */
public final class CasManagementUtils {

    private static final RegisteredServiceJsonSerializer JSON_SERIALIZER = new RegisteredServiceJsonSerializer();
    private static final RegisteredServiceYamlSerializer YAML_SERIALIZER = new RegisteredServiceYamlSerializer();
    private static final Pattern DOMAIN_EXTRACTOR = RegexUtils.createPattern("^\\^?https?\\??://(.*?)(?:[(]?[:/]|$)");
    private static final Pattern DOMAIN_PATTERN = RegexUtils.createPattern("^[a-z0-9-.]*$");

    private CasManagementUtils() {
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

    /**
     * Parses the passed json File into a RegisteredService.
     * @param json - the json file
     * @return - RegisteredService
     */
    public static RegisteredService fromJson(final File json) {
        return JSON_SERIALIZER.from(json);
    }

    /**
     * Parses the passed yaml into a RegisteredService.
     *
     * @param yaml - the yaml
     * @return - RegisteredService
     * @throws IOException - IO failure
     */
    public static RegisteredService parseYaml(final String yaml) throws IOException {
        val om = YAML_SERIALIZER.getObjectMapper().copy();
        om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true);
        return om.readValue(yaml, RegisteredService.class);
    }

    /**
     * Parses the passed json into a RegisteredService.
     * @param json - the json
     * @return - RegisteredService
     * @throws IOException - IO failure
     */
    public static RegisteredService parseJson(final String json) throws IOException {
        val om = JSON_SERIALIZER.getObjectMapper().copy();
        om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true);
        val jsonString = JsonValue.readHjson(json).toString();
        return om.readValue(jsonString, RegisteredService.class);
    }


    /**
     * Writes Services to file in JSON.
     *
     * @param out - File writer
     * @param svc - the service
     */
    public static void jsonTo(final OutputStream out, final RegisteredService svc) {
        JSON_SERIALIZER.to(out, svc);
    }

    /**
     * Extract domain string.
     *
     * @param service the service
     * @return the string
     */
    public static String extractDomain(final String service) {
        val extractor = DOMAIN_EXTRACTOR.matcher(service.toLowerCase());
        return extractor.lookingAt() ? validateDomain(extractor.group(1)) : "default";
    }

    /**
     * Validate domain string.
     *
     * @param providedDomain the provided domain
     * @return the string
     */
    public static String validateDomain(final String providedDomain) {
        val domain = StringUtils.remove(providedDomain, "\\");
        val match = DOMAIN_PATTERN.matcher(StringUtils.remove(domain, "\\"));
        return match.matches() ? domain : "default";
    }

    /**
     * Formats a Datetime given in seconds for display.
     *
     * @param time - time in seconds
     * @return - formatted Date.
     */
    public static String formatDateTime(final long time) {
        return LocalDateTime.ofInstant(new Date(time * 1000L).toInstant(), ZoneId.systemDefault())
                .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    /**
     * Determines Type of service and returns a string.
     *
     * @param service - the service
     * @return - service type
     */
    public static String getType(final RegisteredService service) {
        val name = service.getClass().getName();
        if (name.contains("OAuth") || name.contains("Oidc")) {
            return "OAuth";
        }
        if (name.contains("Saml")) {
            return "SAML";
        }
        return "CAS";
    }
}
