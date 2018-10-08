package org.apereo.cas.mgmt.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Bean to serialze action info taken on a branch to a client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchActionData implements Serializable {

    /**
     * Data to identify branch.
     */
    private BranchData branch;

    /**
     * Note attached to branch.
     */
    private String note;

}
