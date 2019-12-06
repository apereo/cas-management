package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Serialize Audit Log data from CAS Dashboard.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    /**
     * Search field for user logging in.
     */
    private String principal;

    /**
     * Search field for resource operated on data.
     */
    private String resourceOperatedUpon;

    /**
     * Search field for the type of action logged.
     */
    private String actionPerformed;

    /**
     * Search field for the app code.
     */
    private String applicationCode;

    /**
     * Search field for the timestamp of the log entry.
     */
    private Date whenActionWasPerformed;

    /**
     * Search field for the client IP address making the request.
     */
    private String clientIpAddress;

    /**
     * Search field for the CAS server that logged the action.
     */
    private String serverIpAddress;
}
