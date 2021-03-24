package org.apereo.cas.mgmt.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Bean to serialize Change data to the client.
 *
 * @author Travis Schmidt
 * @since 5.2.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Change implements Serializable {

    /**
     * Id of the change.
     */
    private String id;

    /**
     * Name of the file changed.
     */
    private String fileName;

    /**
     * Type of change.
     */
    private String changeType;

    /**
     * Name of the Registered Service affected.
     */
    private String serviceName;

    /**
     * The old Object ID.
     */
    private String oldId;

    /**
     *  The new Objec ID.
     */
    private String newId;

    /**
     * The type of service affected.
     */
    private String serviceType;
}
