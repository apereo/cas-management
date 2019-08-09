package org.apereo.cas.mgmt.domain;

import org.apereo.cas.authentication.DefaultAuthentication;
import org.apereo.cas.authentication.principal.Service;
import org.apereo.cas.ticket.TicketGrantingTicket;
import org.apereo.cas.ticket.accesstoken.OAuthAccessTokenExpirationPolicy;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Data class representing an OAuth Token from CAS.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class OAuthToken {

    private String id;

    private DefaultAuthentication authentication;

    private String codeChallenge;

    private String codeChallengeMethod;

    private Integer countOfUses;

    private LocalDateTime creationTime;

    private OAuthAccessTokenExpirationPolicy expirationPolicy;

    private Boolean expired;

    private Boolean fromNewLogin;

    private String idToken;

    private LocalDateTime lastTimeUsed;

    private String prefix;

    private LocalDateTime previousTimeUsed;

    private List<String> scopes;

    private Service service;

    private TicketGrantingTicket ticketGrantingTicket;

}
