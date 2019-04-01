package org.apereo.cas.mgmt.domain;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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

    @JsonAlias("AUTHENTICATED_PRINCIPAL")
    private String authenticatedPrincipal;

    @JsonAlias("AUTHENTICATED_SERVICES")
    private Map<String, AuthenticatedService> authenticatedServices;

    @JsonAlias("AUTHENTICATION_ATTRIBUTES")
    private AuthenticationAttributes authenticationAttributes;

    @JsonAlias("AUTHENTICATION_DATE_FORMATTED")
    private LocalDateTime authenticationDate;

    @JsonAlias("IS_PROXIED")
    private Boolean proxied;

    @JsonAlias("NUMBER_OF_USES")
    private Integer numberOfUses;

    @JsonAlias("PRINCIPAL_ATTRIBUTES")
    private Map<String, List<String>> principalAttributes;

    @JsonAlias("TICKET_GRANTING_TICKET")
    private String ticketGrantingTicket;
}
