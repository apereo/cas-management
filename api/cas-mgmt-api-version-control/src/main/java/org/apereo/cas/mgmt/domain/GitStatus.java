package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

/**
 * Data class used to pass repository state to client.
 *
 * @author Travis Schmidt
 * @since 5.2.2
 */
@Data
@NoArgsConstructor
public class GitStatus implements Serializable {
    /**
     * True if there are uncommitted changes.
     */
    private boolean hasChanges;

    /**
     * True if there are commits unpublished to CAS servers.
     */
    private boolean unpublished;

    /**
     * Number of Pull requests from users that are pending.
     */
    private int pullRequests;

    /**
     * List of submissions to be reviewed.
     */
    private int submissions;

    /**
     * List added files that are uncommitted.
     */
    private Set<String> added;

    /**
     * List of modified files that are uncommitted.
     */
    private Set<String> modified;

    /**
     * List of deleted files that are uncommitted.
     */
    private Set<String> deleted;
}
