package org.apereo.cas.mgmt.services.web.beans;

import java.io.Serializable;

public class RejectData implements Serializable {

    private String id;
    private String note;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(final String note) {
        this.note = note;
    }
}
