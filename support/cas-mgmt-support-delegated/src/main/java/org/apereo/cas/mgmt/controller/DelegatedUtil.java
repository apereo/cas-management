package org.apereo.cas.mgmt.controller;

import org.apereo.cas.mgmt.GitUtil;
import org.apereo.cas.mgmt.domain.BranchData;

import lombok.val;

/**
 * Utility class for delegated functions.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class DelegatedUtil {

    /**
     * Method creates a branch object to be returned to the client.
     *
     * @param r - BranchMap
     * @return - BranchData
     */
    public static BranchData createBranch(final GitUtil.BranchMap r) {
        val branch = new BranchData();
        branch.setName(r.getName());
        branch.setMsg(r.getFullMessage());
        branch.setCommitter(r.getCommitter());
        branch.setTime(r.getCommitTime());
        branch.setAccepted(r.isAccepted());
        branch.setId(r.getId());
        branch.setRejected(r.isRejected());
        branch.setReverted(r.isReverted());
        return branch;
    }

    /**
     * Method will filter refs to only the statuses on Options.
     *
     * @param r       - BranchMap
     * @param options - 0:Submitted, 1:Accepted, 2:Rejected
     * @return - true of the pull should be included
     */
    public static boolean filterPulls(final GitUtil.BranchMap r, final boolean[] options) {
        if (r.getName().equals("refs/heads/master")) {
            return false;
        }
        if (r.isAccepted()) {
            return options[1];
        }
        if (r.isRejected()) {
            return options[2];
        }
        return options[0];
    }
}
