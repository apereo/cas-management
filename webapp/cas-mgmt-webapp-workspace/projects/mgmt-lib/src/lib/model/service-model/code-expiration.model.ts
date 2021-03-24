/**
 * Data class for RegisteredServiceOAuthCodeExpirationPolicy.
 */
export class RegisteredServiceOAuthCodeExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.RegisteredServiceOAuthCodeExpirationPolicy';

  numberOfUses: number;
  timeToLive: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceOAuthCodeExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceOAuthCodeExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthCodeExpirationPolicy) {
    this.numberOfUses = policy?.numberOfUses;
    this.timeToLive = policy?.timeToLive;
    this['@class'] = RegisteredServiceOAuthCodeExpirationPolicy.cName;
  }
}

/**
 * Data class for DefaultRegisteredServiceOAuthCodeExpirationPolicy.
 */
export class DefaultRegisteredServiceOAuthCodeExpirationPolicy extends RegisteredServiceOAuthCodeExpirationPolicy {
  static cName = 'org.apereo.cas.support.oauth.services.DefaultRegisteredServiceOAuthCodeExpirationPolicy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceOAuthCodeExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceOAuthCodeExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceOAuthCodeExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceOAuthCodeExpirationPolicy.cName;
  }

}

/**
 * Global factory function to create RegisteredServiceOAuthCodeExpirationPolicy from js object.
 *
 * @param policy - Policy as js object
 */
export function codeExpirationPolicy(policy?: any): RegisteredServiceOAuthCodeExpirationPolicy {
  if (!policy || DefaultRegisteredServiceOAuthCodeExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceOAuthCodeExpirationPolicy(policy);
  }
  return policy;
}
