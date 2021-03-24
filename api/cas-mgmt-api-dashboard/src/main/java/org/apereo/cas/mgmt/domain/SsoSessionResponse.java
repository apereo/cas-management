package org.apereo.cas.mgmt.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data wrapper for a query response for SSO Sessions from a CAS cluster.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
@Data
@NoArgsConstructor
public class SsoSessionResponse {

    /**
     * List of active sessions retrieved by the request.
     */
    private List<SsoSession> activeSsoSessions;

    /**
     * Number of unique users in the query result.
     */
    private Integer totalPrincipals;

    /**
     * Number of TGTs in the query result.
     */
    private Integer totalTicketGrantingTickets;

    /**
     * Number of total PGTS in the query result.
     */
    private Integer totalProxyGrantingTickets;

    /**
     * Number of tickets of all types.
     */
    private Integer totalTickets;

    /**
     * Total usage count of all tickets.
     */
    private Integer totalUsageCount;
}
