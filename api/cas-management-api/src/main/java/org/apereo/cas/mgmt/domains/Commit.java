package org.apereo.cas.mgmt.domains;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Bean to serialize a commit to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Commit {
    /**
     * Id of the commit.
     */
    private String id;

    /**
     * Commit message of the commit.
     */
    private String text;

    /**
     * Time commit occurred.
     */
    private String commitTime;
}
