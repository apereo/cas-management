package org.apereo.cas.mgmt.services.web.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Bean to serialze data about a branch to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchData implements Serializable {
    /**
     * Name of branch.
     */
    private String name;

    /**
     * Commit Message for branch.
     */
    private String msg;

    /**
     * Name of committer.
     */
    private String committer;

    /**
     * Timestamp of commit.
     */
    private long time;

    /**
     * Object Id of the branch commit.
     */
    private String id;

    /**
     * Flag if branch has been accepted.
     */
    private boolean accepted;

    /**
     * Flag if branch has been rejected.
     */
    private boolean rejected;

    /**
     * Flag if branch has been reverted.
     */
    private boolean reverted;
}
