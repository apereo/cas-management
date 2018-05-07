package org.apereo.cas.mgmt.services.web.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.eclipse.jgit.lib.ObjectId;

import java.io.Serializable;

/**
 * Bean to serialize a Diff to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Diff implements Serializable {
    /**
     * OldId before.
     */
    private String oldId;

    /**
     * NewID after.
     */
    private String newId;

    /**
     * Path of the changed file.
     */
    private String path;

    /**
     * Type of change.
     */
    private String changeType;

    /**
     * Who committed the change.
     */
    private String committer;

    /**
     * Time commit occurred.
     */
    private String commitTime;

    /**
     * Id of commit.
     */
    private String commit;

    /**
     * Name of the service.
     */
    private String name;

    public Diff(final String path,
                final ObjectId oldId,
                final ObjectId newId,
                final String changeType,
                final String name) {
        this.path = path;
        this.oldId = ObjectId.toString(oldId);
        this.newId = ObjectId.toString(newId);
        this.changeType = changeType;
        this.name = name;
    }
}
