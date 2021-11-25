package org.apereo.cas.mgmt;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.revwalk.RevCommit;

/**
 * This is {@link BranchMap}.
 *
 * @author Misagh Moayyed
 * @since 6.5.0
 */
@RequiredArgsConstructor
@Getter
@Setter
public class BranchMap {
    private final GitUtil git;

    private Ref ref;

    private RevCommit revCommit;

    public BranchMap(final GitUtil git, final Ref ref, final RevCommit revCommit) {
        this(git);
        this.ref = ref;
        this.revCommit = revCommit;
    }

    public String getName() {
        return ref.getName();
    }

    public String getFullMessage() {
        return revCommit.getFullMessage();
    }

    public String getCommitter() {
        return revCommit.getCommitterIdent().getName();
    }

    public int getCommitTime() {
        return revCommit.getCommitTime();
    }

    public String getId() {
        return revCommit.abbreviate(GitUtil.NAME_LENGTH).name();
    }

    public boolean isAccepted() {
        return git.isAccepted(revCommit);
    }

    public boolean isRejected() {
        return git.isRejected(revCommit);
    }

    public boolean isReverted() {
        return git.isReverted(revCommit);
    }
}
