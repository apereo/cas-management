package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data class used to send pending submission info to client.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PendingItem {
    /**
     * Unique identifier for the the pending submission.
     */
    private String id;

    /**
     * Name of the pending submission.
     */
    private String name;

    /**
     * Service ID of the pending Submission.
     */
    private String serviceId;

    /**
     * Timestamp the service was submitted.
     */
    private String submitted;

    /**
     * Current status of the pending submission.
     */
    private String status;

    /**
     * Service type of the pending submission.
     */
    private String type;
}
