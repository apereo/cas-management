package org.apereo.cas.mgmt.services.web.beans;

import java.util.Set;

/**
 * Data class used to pass repository state to client.
 *
 * @author Travis Schmidt
 * @since 5.2.2
 */
public class GitStatus {
    private boolean hasChanges;
    private boolean unpublished;
    private boolean pendingSubmits;
    private Set<String> added;
    private Set<String> modified;
    private Set<String> deleted;

    public boolean isHasChanges() {
        return hasChanges;
    }

    public void setHasChanges(final boolean hasChanges) {
        this.hasChanges = hasChanges;
    }

    public Set<String> getAdded() {
        return added;
    }

    public void setAdded(final Set<String> added) {
        this.added = added;
    }

    public Set<String> getModified() {
        return modified;
    }

    public void setModified(final Set<String> modified) {
        this.modified = modified;
    }

    public Set<String> getDeleted() {
        return deleted;
    }

    public void setDeleted(final Set<String> deleted) {
        this.deleted = deleted;
    }

    public boolean isUnpublished() {
        return unpublished;
    }

    public void setUnpublished(final boolean unpublished) {
        this.unpublished = unpublished;
    }

    public boolean isPendingSubmits() {
        return pendingSubmits;
    }

    public void setPendingSubmits(final boolean pendingSubmits) {
        this.pendingSubmits = pendingSubmits;
    }
}
