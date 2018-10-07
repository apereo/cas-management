package org.apereo.cas.mgmt.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Class to serialize app configuration to client.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppConfig {
    private String mgmtType;
    private boolean versionControl;
    private boolean delegatedMgmt;
    private boolean syncScript;
}
