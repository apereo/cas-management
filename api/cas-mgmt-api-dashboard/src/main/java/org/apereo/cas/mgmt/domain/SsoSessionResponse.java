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

    private List<SsoSession> activeSsoSessions;

    private Integer totalPrincipals;

    private Integer totalTicketGrantingTickets;

    private Integer totalProxyGrantingTickets;

    private Integer totalTickets;

    private Integer totalUsageCount;
}
