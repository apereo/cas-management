package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data class representing the sessions state of a CAS server.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class Session {

    private String status;

    private Details details;

    /**
     * Session details.
     */
    @Data
    @NoArgsConstructor
    public static class Details {
        private int sessionCount;
        private int ticketCount;
        private String message;
    }
}
