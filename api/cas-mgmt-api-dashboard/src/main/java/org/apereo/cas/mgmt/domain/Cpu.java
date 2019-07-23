package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data class representing jvm stats pulled from a cas server.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class Cpu {

    private String status;

    private Details details;

    /**
     * Details for the CPU status.
     */
    @Data
    @NoArgsConstructor
    public static class Details {
        private double systemLoad;
        private double systemUsage;
        private double processUsage;
        private double jvmCommitted;
        private double jvmUsed;
        private double maxRequest;
        private double busyThreads;
        private double uptime;
    }
}
