package org.apereo.cas.mgmt.beans;

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
    private boolean hasChanges;
    private boolean unpublished;
    private int pullRequests;
    private Set<String> added;
    private Set<String> modified;
    private Set<String> deleted;
}
