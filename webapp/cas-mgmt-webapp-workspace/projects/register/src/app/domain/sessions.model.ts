/**
 * Top level sso session response.
 */
export class SsoSessionsResponse {

  activeSsoSessions: SsoSession[];

  totalPrincipals: number;

  totalTicketGrantingTickets: number;

  totalProxyGrantingTickets: number;

  totalTickets: number;

  totalUsageCount: number;
}

/**
 * Represents an sso session on the server.
 */
export class SsoSession {
  authenticatedPrincipal: string;

  authenticatedServices: Map<string, AuthenticatedService>;

  authenticationAttributes: AuthenticationAttributes;

  authenticationDate: string;

  proxied: boolean;

  numberOfUses: number;

  principalAttributes: Map<string, string[]>;

  ticketGrantingTicket: string;

  selected: boolean;
}

/**
 * Represents the authenticated service user logged in to.
 */
export class AuthenticatedService {
  artifactId: string;

  format: string;

  id: string;

  loggedOutAlready: boolean;

  originalUrl: string;

  principal: string;

  source: string;
}

/**
 * Authentication attributes released.
 */
export class AuthenticationAttributes {

  authenticationMethod: string[];

  credentialType: string[];

  samlAuthenticationStatementAuthnMethod: string[];

  successfulAuthenticationHandlers: string[];
}

/**
 * Represents OAuth token.
 */
export class OAuthToken {
  id: string;
  expirationPolicy: ExpirationPolicy;
  expired: boolean;
  lastTimeUsed: string;
  creationTime: string;
  countOfUses: number;
  principal: string;
  clientId: string;
  selected: boolean;
}

/**
 * Represents expiration policy.
 */
export class ExpirationPolicy {
  timeToIdle: number;
  timeToLive: number;
}
