package org.apereo.cas.mgmt.services.web.beans;

import java.io.Serializable;

/**
 * Bean to serialize History info to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
public class History implements Serializable {
    private String id;
    private String message;
    private String committer;
    private String time;
    private String path;
    private String commit;

    public History() {

    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public String getCommitter() {
        return committer;
    }

    public void setCommitter(final String committer) {
        this.committer = committer;
    }

    public String getTime() {
        return time;
    }

    public void setTime(final String time) {
        this.time = time;
    }

    public void setPath(final String path) {
        this.path = path;
    }

    public String getPath() {
        return this.path;
    }

    public String getCommit() {
        return commit;
    }

    public void setCommit(final String commit) {
        this.commit = commit;
    }
}
