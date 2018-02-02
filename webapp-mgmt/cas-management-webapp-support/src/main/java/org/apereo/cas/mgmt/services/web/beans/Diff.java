package org.apereo.cas.mgmt.services.web.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
