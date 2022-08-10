package org.apereo.cas.mgmt.domain;

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
    /**
     * Flag indicating if DEFAULT or DOMAIN aware manager is in use.
     */
    private String mgmtType;

    /**
     * Flag indicating if admin dashboard is enabled.
     */
    private boolean dashboardEnabled;

    /**
     * Flag indicating if version control is enabled.
     */
    private boolean versionControl;

    /**
     * Flag indicating if Delegated management is enabled.
     */
    private boolean delegatedMgmt;

    /**
     * Flag indicating if a sync script is configured.
     */
    private boolean syncScript;

    /**
     * Flag indicating if a contact lookup is configured.
     */
    private boolean contactLookup;

    /**
     * Flag indicating if OAuth services are enabled.
     */
    private boolean oauthEnabled;

    /**
     * Flag indicating if SAML services are enabled.
     */
    private boolean samlEnabled;

    /**
     * Flag indicating if Atrribute Definition Store is enabled.
     */
    private boolean attributeStoreEnabled;

    /**
     * Flag indicating if Submissions feature is enabled.
     */
    private boolean submissionsEnabled;
}
