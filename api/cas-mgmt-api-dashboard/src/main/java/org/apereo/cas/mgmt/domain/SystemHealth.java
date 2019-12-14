package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Class used to serialize system info to client.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SystemHealth {
    /**
     * Overall health status of the system.
     */
    private String status;

    /**
     * System details for a CAS server.
     */
    private Details details;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Details {
        /**
         * System cpu usage on the CAS server.
         */
        private double systemUsage;

        /**
         * The load on the CAS Server.
         */
        private double systemLoad;

        /**
         * CAS server cpu usage.
         */
        private double processUsage;

        /**
         * Memory used by the jvm.
         */
        private double jvmUsed;

        /**
         * Memory committed for the JVM.
         */
        private double jvmCommitted;

        /**
         * Memory used by the heap.
         */
        private double heapUsed;

        /**
         * Memory committed for the heap.
         */
        private double heapCommitted;

        /**
         * Uptime of the CAS Server.
         */
        private double uptime;

        /**
         * Number of requests processed.
         */
        private double requests;

        /**
         * Max time a request took.
         */
        private double maxRequest;
    }
}
