package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

/**
 * Claas used to serialize Cache data to client.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Data
@NoArgsConstructor
public class Cache {

    /**
     * Health status of the cache.
     */
    private String status;

    /**
     * Cache details.
     */
    private Details details;

    @Data
    @NoArgsConstructor
    public static class Details {
        /**
         * Set of maps that are part of the cache and their details.
         */
        private Map<String, MapDetails> maps;
    }

    @Data
    @NoArgsConstructor
    public static class MapDetails {
        /**
         * Memory used by the cache map.
         */
        private Long memory;

        /**
         * Number of items in the cache map.
         */
        private Long size;

        /**
         * Total capacity of the cache map.
         */
        private Long capacity;
    }

}
