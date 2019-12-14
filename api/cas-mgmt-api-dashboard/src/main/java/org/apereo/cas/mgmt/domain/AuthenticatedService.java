package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a service a user is authenticated against.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class AuthenticatedService {

    /**
     * Artifact Id of for the users session.
     */
    private String artifactId;

    /**
     * Format.
     */
    private String format;

    /**
     * ID of the service ticket used to validate.
     */
    private String id;

    /**
     * Flag if the session has ended.
     */
    private Boolean loggedOutAlready;

    /**
     * URL of the service authenticated to.
     */
    private String originalUrl;

    /**
     * Username of the person logged in.
     */
    private String principal;

    /**
     * Original source that requested the validation.
     */
    private String source;

}
