package org.apereo.cas.mgmt;

import lombok.experimental.UtilityClass;
import lombok.val;
import org.springframework.boot.Banner;

import java.util.HashMap;
import java.util.Map;

/**
 * This is {@link CasManagementEmbeddedContainerUtils}.
 *
 * @author Misagh Moayyed
 * @since 5.1.0
 */
@UtilityClass
public class CasManagementEmbeddedContainerUtils {
    /**
     * Property to dictate to the environment whether embedded container is running CAS.
     */
    public static final String EMBEDDED_CONTAINER_CONFIG_ACTIVE = "CasEmbeddedContainerConfigurationActive";

    /**
     * Gets runtime properties.
     *
     * @param embeddedContainerActive the embedded container active
     * @return the runtime properties
     */
    public static Map<String, Object> getRuntimeProperties(final Boolean embeddedContainerActive) {
        val properties = new HashMap<String, Object>();
        properties.put(EMBEDDED_CONTAINER_CONFIG_ACTIVE, embeddedContainerActive);
        return properties;
    }

    /**
     * Gets cas banner instance.
     *
     * @return the cas banner instance
     */
    public static Banner getCasManagementBannerInstance() {
        return new CasManagementBanner();
    }
}
