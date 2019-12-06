package org.apereo.cas.configuration.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * Configured CAS servers in the cluster that can be managed.
 *
 * @author Travis schmidt
 * @since 6.0
 */
@Getter
@Setter
public class CasServers implements Serializable {

    /**
     * User friendly name given to a server in the cluster.
     */
    private String name;

    /**
     * The full path to the /cas path of the server.
     */
    private String url;

}
