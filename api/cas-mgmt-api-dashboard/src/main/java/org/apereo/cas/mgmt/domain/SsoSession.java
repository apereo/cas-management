package org.apereo.cas.mgmt.domain;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

/**
 * Data class representing a user SSO Session for a CAS Cluster.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class SsoSession {

    /**
     * The user id of the authenticated principal.
     */
    @JsonAlias("AUTHENTICATED_PRINCIPAL")
    private String authenticatedPrincipal;

    /**
     * List of services authenticated to by this session.
     */
    @JsonAlias("AUTHENTICATED_SERVICES")
    private Map<String, AuthenticatedService> authenticatedServices;

    /**
     * Attributes retrieved during authentication.
     */
    @JsonAlias("AUTHENTICATION_ATTRIBUTES")
    private AuthenticationAttributes authenticationAttributes;

    /**
     * Timestamp authentication occurred.
     */
    @JsonAlias("AUTHENTICATION_DATE")
    private ZonedDateTime authenticationDate;

    /**
     * Flag is the session is PGT.
     */
    @JsonAlias("IS_PROXIED")
    private Boolean proxied;

    /**
     * Number of times the TGT used to validate services.
     */
    @JsonAlias("NUMBER_OF_USES")
    private Integer numberOfUses;

    /**
     * List of the principal attributes resolved for the session.
     */
    @JsonAlias("PRINCIPAL_ATTRIBUTES")
    private Map<String, List<String>> principalAttributes;

    /**
     * The id of the TGT for this session.
     */
    @JsonAlias("TICKET_GRANTING_TICKET")
    private String ticketGrantingTicket;
}
