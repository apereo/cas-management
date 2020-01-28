export class RegisteredServiceOAuthAccessTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.RegisteredServiceOAuthAccessTokenExpirationPolicy';

  maxTimeToLive: string;
  timeToKill: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceOAuthAccessTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthAccessTokenExpirationPolicy) {
    this.maxTimeToLive = (policy && policy.maxTimeToLive) || null;
    this.timeToKill = (policy && policy.timeToKill) || null;
    this['@class'] = RegisteredServiceOAuthAccessTokenExpirationPolicy.cName;
  }
}

export class DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy extends RegisteredServiceOAuthAccessTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthAccessTokenExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy.cName;
  }

}

export function accessTokenExpirationPolicy(policy?: any): RegisteredServiceOAuthAccessTokenExpirationPolicy {
  if (!policy || DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy(policy);
  }
  return policy;
}
