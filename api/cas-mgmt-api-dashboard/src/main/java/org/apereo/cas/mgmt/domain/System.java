package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class System {
    private String status;

    private Details details;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Details {
        private double systemUsage;
        private double systemLoad;
        private double processUsage;
        private double jvmUsed;
        private double jvmCommitted;
        private double heapUsed;
        private double heapCommitted;
        private double uptime;
        private double requests;
        private double maxRequest;
    }
}
