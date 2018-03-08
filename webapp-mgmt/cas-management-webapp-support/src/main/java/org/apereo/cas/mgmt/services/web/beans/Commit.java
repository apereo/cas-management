package org.apereo.cas.mgmt.services.web.beans;

/**
 * Bean to serialize a commit to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
public class Commit {
    private String id;
    private String text;
    private String commitTime;

    public Commit() {

    }

    public Commit(final String id, final String text, final String commitTime) {
        this.id = id;
        this.text = text;
        this.commitTime = commitTime;
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(final String text) {
        this.text = text;
    }

    public String getCommitTime() {
        return commitTime;
    }

    public void setCommitTime(final String commitTime) {
        this.commitTime = commitTime;
    }
}
