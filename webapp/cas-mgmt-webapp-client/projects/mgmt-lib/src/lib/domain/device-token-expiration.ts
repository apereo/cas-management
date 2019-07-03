export class RegisteredServiceOAuthDeviceTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.RegisteredServiceOAuthDeviceTokenExpirationPolicy';

  timeToKill: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceOAuthDeviceTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthDeviceTokenExpirationPolicy) {
    this.timeToKill = (policy && policy.timeToKill) || null;
    this['@class'] = RegisteredServiceOAuthDeviceTokenExpirationPolicy.cName;
  }
}

export class DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy extends RegisteredServiceOAuthDeviceTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthDeviceTokenExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy.cName;
  }

}

export function deviceTokenExpirationPolicy(policy?: any): RegisteredServiceOAuthDeviceTokenExpirationPolicy {
  if (!policy || DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy(policy)
  }
  return policy;
}
