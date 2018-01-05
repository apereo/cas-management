package org.apereo.cas.mgmt.services.web.beans;

import java.io.Serializable;

/**
 * Bean to serialize Change data to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
public class Change implements Serializable {
    private String id;
    private String fileName;
    private String changeType;
    private String serviceName;
    private String oldId;
    private String newId;

    public Change(final String id,
                  final String fileName,
                  final String changeType,
                  final String serviceName,
                  final String oldId,
                  final String newId) {
        this.id = id;
        this.fileName = fileName;
        this.changeType = changeType;
        this.serviceName = serviceName;
        this.newId = newId;
        this.oldId = oldId;
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(final String fileName) {
        this.fileName = fileName;
    }

    public String getChangeType() {
        return changeType;
    }

    public void setChangeType(final String changeType) {
        this.changeType = changeType;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(final String serviceName) {
        this.serviceName = serviceName;
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
}
