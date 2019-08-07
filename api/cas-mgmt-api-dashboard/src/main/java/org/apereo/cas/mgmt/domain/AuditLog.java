package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Class used to serialize Audit log entries to the client.
 *
 * @author Travis Schmidt
 * @since 6.1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    private String principal;
    private String resourceOperatedUpon;
    private String actionPerformed;
    private String applicationCode;
    private Date whenActionWasPerformed;
    private String clientIpAddress;
    private String serverIpAddress;
}
