/**
 * Data class for RegisteredServiceOAuthDeviceTokenExpirationPolicy.
 */
export class RegisteredServiceOAuthDeviceTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.RegisteredServiceOAuthDeviceTokenExpirationPolicy';

  timeToKill: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceOAuthDeviceTokenExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceOAuthDeviceTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthDeviceTokenExpirationPolicy) {
    this.timeToKill = policy?.timeToKill;
    this['@class'] = RegisteredServiceOAuthDeviceTokenExpirationPolicy.cName;
  }
}

/**
 * Data class for DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy.
 */
export class DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy extends RegisteredServiceOAuthDeviceTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthDeviceTokenExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy.cName;
  }

}

/**
 * Global factory function to create RegisteredServiceOAuthDeviceTokenExpirationPolicy from js object.
 *
 * @param policy - policy as js object
 */
export function deviceTokenExpirationPolicy(policy?: any): RegisteredServiceOAuthDeviceTokenExpirationPolicy {
  if (!policy || DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceOAuthDeviceTokenExpirationPolicy(policy);
  }
  return policy;
}
