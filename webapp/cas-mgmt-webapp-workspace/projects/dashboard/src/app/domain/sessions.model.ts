/**
 * SsoSessionsResponse model.
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
 * SsoSession model.
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
}

/**
 * AuthenticatedService model.
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
 * AuthenticationAttributes model.
 */
export class AuthenticationAttributes {

  authenticationMethod: string[];

  credentialType: string[];

  samlAuthenticationStatementAuthnMethod: string[];

  successfulAuthenticationHandlers: string[];
}

/**
 * OAuthToken model.
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
}

/**
 * ExpirationPolicy model.
 */
export class ExpirationPolicy {
  timeToIdle: number;
  timeToLive: number;
}
