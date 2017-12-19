package org.apereo.cas.mgmt.services.web.beans;

import org.eclipse.jgit.lib.ObjectId;

import java.io.Serializable;

/**
 * Bean to serialize a Diff to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
public class Diff implements Serializable {
    private String oldId;
    private String newId;
    private String path;
    private String changeType;

    public Diff(){

    }

    public Diff(final String path,
                final ObjectId oldId,
                final ObjectId newId,
                final String changeType) {
        this.path = path;
        this.oldId = ObjectId.toString(oldId);
        this.newId = ObjectId.toString(newId);
        this.changeType = changeType;
    }

    public String getOldId() {
        return oldId;
    }

    public void setOldId(final String oldId) {
        this.oldId = oldId;
    }

    public String getNewId() {
        return newId;
    }

    public void setNewId(final String newId) {
        this.newId = newId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(final String path) {
        this.path = path;
    }

    public String getChangeType() {
        return changeType;
    }

    public void setChangeType(final String changeType) {
        this.changeType = changeType;
    }
}
