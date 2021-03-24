/**
 * Data class for RegisteredServiceOAuthRefreshTokenExpirationPolicy.
 */
export class RegisteredServiceOAuthRefreshTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.RegisteredServiceOAuthRefreshTokenExpirationPolicy';

  timeToKill: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceOAuthRefreshTokenExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceOAuthRefreshTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthRefreshTokenExpirationPolicy) {
    this.timeToKill = policy?.timeToKill;
    this['@class'] = RegisteredServiceOAuthRefreshTokenExpirationPolicy.cName;
  }
}

/**
 * Data class for DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy.
 */
export class DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy extends RegisteredServiceOAuthRefreshTokenExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthRefreshTokenExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy.cName;
  }

}

/**
 * Global factory function to create RegisteredServiceOAuthRefreshTokenExpirationPolicy from js object.
 *
 * @param policy - policy as js object
 */
export function refreshTokenExpirationPolicy(policy?: any): RegisteredServiceOAuthRefreshTokenExpirationPolicy {
  if (!policy || DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceOAuthRefreshTokenExpirationPolicy(policy);
  }
  return policy;
}
