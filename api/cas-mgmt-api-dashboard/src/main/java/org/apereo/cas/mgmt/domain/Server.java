package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Data wrapper class for a CAS server status.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class Server {

    /**
     * Name of the CAS server.
     */
    private String name;

    /**
     * System Health details of the CAS server.
     */
    private Map<String, Object> health = new LinkedHashMap<>();
}
