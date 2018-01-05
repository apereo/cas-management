package org.apereo.cas.mgmt.services.web.beans;

import java.io.Serializable;

/**
 * Bean to serialze data about a branch to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
public class BranchData implements Serializable {
    private String name;
    private boolean accepted;
    private String msg;
    private String committer;
    private long time;
    private String id;
    private boolean rejected;
    private boolean reverted;

    public BranchData() {

    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(final String msg) {
        this.msg = msg;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getCommitter() {
        return committer;
    }

    public void setCommitter(final String committer) {
        this.committer = committer;
    }

    public long getTime() {
        return time;
    }

    public void setTime(final long time) {
        this.time = time;
    }

    public boolean isRejected() {
        return rejected;
    }

    public void setRejected(final boolean rejected) {
        this.rejected = rejected;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(final boolean accepted) {
        this.accepted = accepted;
    }

    public boolean isReverted() {
        return reverted;
    }

    public void setReverted(final boolean reverted) {
        this.reverted = reverted;
    }
}
