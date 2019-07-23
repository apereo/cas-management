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

    private String artifactId;

    private String format;

    private String id;

    private Boolean loggedOutAlready;

    private String originalUrl;

    private String principal;

    private String source;

}
