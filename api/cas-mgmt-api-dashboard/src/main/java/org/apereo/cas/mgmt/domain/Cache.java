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

    private String status;

    private Details details;

    @Data
    @NoArgsConstructor
    public static class Details {
        private Map<String, MapDetails> maps;
    }

    @Data
    @NoArgsConstructor
    public static class MapDetails {
        private Long memory;
        private Long size;
        private Long capacity;
    }

}
