package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
public class Hazelcast {

    private String status;

    private Details details;

    @Data
    @NoArgsConstructor
    public static class Details {
        private Boolean master;
        private Integer clusterSize;
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
