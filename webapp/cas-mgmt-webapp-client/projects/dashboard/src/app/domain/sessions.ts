
export class SsoSessionsResponse {

  activeSsoSessions: SsoSession[];

  totalPrincipals: number;

  totalTicketGrantingTickets: number;

  totalProxyGrantingTickets: number;

  totalTickets: number;

  totalUsageCount: number;
}

export class SsoSession {
  authenticatedPrincipal: string;

  authenticatedServices: Map<String, AuthenticatedService>;

  authenticationAttributes: AuthenticationAttributes;

  authenticationDate: string;

  proxied: boolean;

  numberOfUses: number;

  principalAttributes: Map<String, String[]>;

  ticketGrantingTicket: string;
}

export class AuthenticatedService {
  artifactId: string;

  format: string;

  id: string;

  loggedOutAlready: boolean;

  originalUrl: string;

  principal: string;

  source: string;
}

export class AuthenticationAttributes {

  authenticationMethod: string[];

  credentialType: string[];

  samlAuthenticationStatementAuthnMethod: string[];

  successfulAuthenticationHandlers: string[];
}

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

export class ExpirationPolicy {
  timeToIdle: number;
  timeToLive: number;
}
