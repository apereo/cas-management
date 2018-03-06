package org.apereo.cas.mgmt.services.web.beans;

import java.io.Serializable;

/**
 * Class to serialize app configuration to client.
 *
 * @author Travis Schmidt
 * @since 5.3.0
 */
public class AppConfig implements Serializable {
    private String mgmtType;
    private boolean versionControl;
    private boolean delegatedMgmt;
    private boolean syncScript;

    public String getMgmtType() {
        return mgmtType;
    }

    public void setMgmtType(final String mgmtType) {
        this.mgmtType = mgmtType;
    }

    public boolean isVersionControl() {
        return versionControl;
    }

    public void setVersionControl(final boolean versionControl) {
        this.versionControl = versionControl;
    }

    public boolean isDelegatedMgmt() {
        return delegatedMgmt;
    }

    public void setDelegatedMgmt(final boolean delegatedMgmt) {
        this.delegatedMgmt = delegatedMgmt;
    }

    public boolean isSyncScript() {
        return syncScript;
    }

    public void setSyncScript(final boolean syncScript) {
        this.syncScript = syncScript;
    }
}
