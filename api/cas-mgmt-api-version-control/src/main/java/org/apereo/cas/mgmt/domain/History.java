package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Bean to serialize History info to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Data
@AllArgsConstructor

@NoArgsConstructor
public class History implements Serializable {
    /**
     * Id.
     */
    private String id;

    /**
     * Commit message.
     */
    private String message;

    /**
     * The user id of the committer.
     */
    private String committer;

    /**
     * Time commit occurred.
     */
    private String time;

    /**
     * Path to the file.
     */
    private String path;

    /**
     * Commit id.
     */
    private String commit;
}
