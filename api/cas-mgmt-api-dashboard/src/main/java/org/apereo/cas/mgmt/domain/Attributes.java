package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

/**
 * Serialize resolved attributes from CAS Dashboard.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Attributes {
    /**
     * User id whose attributes were resolved.
     */
    private String uid;

    /**
     * Map of attributes resolved.
     */
    private Map<String, List<String>> attributes;
}
