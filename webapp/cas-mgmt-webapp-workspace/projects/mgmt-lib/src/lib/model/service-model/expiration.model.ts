/**
 * Data class for RegisteredServiceExpirationPolicy.
 */
export abstract class RegisteredServiceExpirationPolicy {
  expirationDate: string;
  deleteWhenExpired: boolean;
  notifyWhenDeleted: boolean;

  constructor(policy?: RegisteredServiceExpirationPolicy) {
    this.notifyWhenDeleted = policy?.notifyWhenDeleted ?? false;
    this.deleteWhenExpired = policy?.deleteWhenExpired ?? false;
    this.expirationDate = policy?.expirationDate;
  }
}

/**
 * Data class for DefaultRegisteredServiceExpirationPolicy.
 */
export class DefaultRegisteredServiceExpirationPolicy extends RegisteredServiceExpirationPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceExpirationPolicy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceExpirationPolicy.cName;
  }
}

/**
 * Global factory function to create RegisteredServiceExpirationPolicy from js object.
 *
 * @param policy - policy as js object
 */
export function expirationPolicyFactory(policy?: any): RegisteredServiceExpirationPolicy {
  if (!policy || DefaultRegisteredServiceExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceExpirationPolicy(policy);
  }
  return policy;

}
