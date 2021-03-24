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
    private String id;
    private String name;
    private String serviceId;
    private String submitted;
    private String status;
    private String type;
}
