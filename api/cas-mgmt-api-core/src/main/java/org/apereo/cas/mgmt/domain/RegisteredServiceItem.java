package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Class used to serialize service information to be used when presenting
 * lists of services.
 *
 * @author Travis Schmidt
 * @since 5.2
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisteredServiceItem implements Serializable {

    private static final long serialVersionUID = 4882440567964605644L;

    /**
     * Order for the service.
     */
    private int evalOrder = Integer.MIN_VALUE;

    /**
     * Generated ID for the service.
     */
    private String assignedId;

    /**
     * Service ID as url for the service.
     */
    private String serviceId;

    /**
     * Given name of the service.
     */
    private String name;

    /**
     * Description for the service.
     */
    private String description;

    /**
     * Current status if changed.
     */
    private String status;

}
