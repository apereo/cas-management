export class RegisteredServiceOAuthCodeExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.RegisteredServiceOAuthCodeExpirationPolicy';

  numberOfUses: number;
  timeToLive: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceOAuthCodeExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthCodeExpirationPolicy) {
    this.numberOfUses = policy?.numberOfUses;
    this.timeToLive = policy?.timeToLive;
    this['@class'] = RegisteredServiceOAuthCodeExpirationPolicy.cName;
  }
}

export class DefaultRegisteredServiceOAuthCodeExpirationPolicy extends RegisteredServiceOAuthCodeExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.DefaultRegisteredServiceOAuthCodeExpirationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceOAuthCodeExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthCodeExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceOAuthCodeExpirationPolicy.cName;
  }

}

export function codeExpirationPolicy(policy?: any): RegisteredServiceOAuthCodeExpirationPolicy {
  if (!policy || DefaultRegisteredServiceOAuthCodeExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceOAuthCodeExpirationPolicy(policy);
  }
  return policy;
}
