package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data class representing a server status in the CAS cluster.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class Status {

    private String status;

    private Details details;

    /**
     * Status details.
     */
    @Data
    @NoArgsConstructor
    public static class Details {
        private Memory memory;
        private Session session;
        private Cpu cpuMonitor;
        private Hazelcast hazelcast;
        private DuoSecurity duoSecurity;
    }
}
