/**
 * Data class for RegisteredServiceOAuthAccessTokenExpirationPolicy.
 */
export class RegisteredServiceOAuthAccessTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.RegisteredServiceOAuthAccessTokenExpirationPolicy';

  maxTimeToLive: string;
  timeToKill: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceOAuthAccessTokenExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceOAuthAccessTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthAccessTokenExpirationPolicy) {
    this.maxTimeToLive = policy?.maxTimeToLive;
    this.timeToKill = policy?.timeToKill;
    this['@class'] = RegisteredServiceOAuthAccessTokenExpirationPolicy.cName;
  }
}

/**
 * Data class for DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy.
 */
export class DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy extends RegisteredServiceOAuthAccessTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthAccessTokenExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy.cName;
  }

}

/**
 * Global factory function to create a RegisteredServiceOAuthAccessTokenExpirationPolicy from the passed js object.
 *
 * @param policy - policy as js object
 */
export function accessTokenExpirationPolicy(policy?: any): RegisteredServiceOAuthAccessTokenExpirationPolicy {
  if (!policy || DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceOAuthAccessTokenExpirationPolicy(policy);
  }
  return policy;
}
