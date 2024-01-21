package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serial;
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

    @Serial
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

    /**
     * Type of service.
     */
    private String type;

    /**
     * If Duo is required.
     */
    private boolean duo;

    /**
     * if SSO is enabled.
     */
    private boolean sso;

    /**
     * When the service expires.
     */
    private String expires;

    /**
     * ucdRole.
     */
    private String ucdRole;

    /**
     * Who submitted the request.
     */
    private String submitter;

    /**
     * When the request was submitted.
     */
    private String submitted;

    /**
     * The fully qualified class name.
     */
    private String cName;

    /**
     * Flag for if the service is stage only.
     */
    private boolean staged;

}
