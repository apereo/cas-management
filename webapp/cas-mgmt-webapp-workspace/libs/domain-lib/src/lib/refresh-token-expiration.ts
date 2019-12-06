export class RegisteredServiceOAuthRefreshTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.RegisteredServiceOAuthRefreshTokenExpirationPolicy';

  timeToKill: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceOAuthRefreshTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthRefreshTokenExpirationPolicy) {
    this.timeToKill = (policy && policy.timeToKill) || null;
    this['@class'] = RegisteredServiceOAuthRefreshTokenExpirationPolicy.cName;
  }
}

export class DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy extends RegisteredServiceOAuthRefreshTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthRefreshTokenExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy.cName;
  }

}

export function refreshTokenExpirationPolicy(policy?: any): RegisteredServiceOAuthRefreshTokenExpirationPolicy {
  if (!policy || DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy(policy);
  }
  return policy;
}
