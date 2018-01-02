package org.apereo.cas.mgmt.services.web.beans;

import java.io.Serializable;

/**
 * Bean to serialze action info taken on a branch to a client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
public class BranchActionData implements Serializable {
    private BranchData branch;
    private String note;

    BranchActionData() {

    }

    public BranchData getBranch() {
        return branch;
    }

    public void setBranch(final BranchData branch) {
        this.branch = branch;
    }

    public String getNote() {
        return note;
    }

    public void setNote(final String note) {
        this.note = note;
    }
}
