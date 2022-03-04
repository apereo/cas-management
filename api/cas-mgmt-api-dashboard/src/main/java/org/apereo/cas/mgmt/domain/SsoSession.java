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
    @JsonAlias("authenticated_principal")
    private String authenticatedPrincipal;

    /**
     * List of services authenticated to by this session.
     */
    @JsonAlias("authenticated_services")
    private Map<String, AuthenticatedService> authenticatedServices;

    /**
     * Attributes retrieved during authentication.
     */
    @JsonAlias("authentication_attributes")
    private AuthenticationAttributes authenticationAttributes;

    /**
     * Timestamp authentication occurred.
     */
    @JsonAlias("authentication_date")
    private ZonedDateTime authenticationDate;

    /**
     * Flag is the session is PGT.
     */
    @JsonAlias("is_proxied")
    private Boolean proxied;

    /**
     * Number of times the TGT used to validate services.
     */
    @JsonAlias("number_of_uses")
    private Integer numberOfUses;

    /**
     * List of the principal attributes resolved for the session.
     */
    @JsonAlias("principal_attributes")
    private Map<String, List<String>> principalAttributes;

    /**
     * The id of the TGT for this session.
     */
    @JsonAlias("ticket_granting_ticket")
    private String ticketGrantingTicket;
}
