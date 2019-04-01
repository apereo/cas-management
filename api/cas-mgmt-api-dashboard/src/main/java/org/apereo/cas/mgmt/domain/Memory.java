package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data class representing memory state of a CAS server.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class Memory {

    private String status;

    private Details details;

    /**
     * Memory details.
     */
    @Data
    @NoArgsConstructor
    public static class Details {
        private long freeMemory;
        private long totalMemory;
    }
}
