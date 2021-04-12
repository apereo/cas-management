/**
 * Data class for RegisteredServiceServiceTicketExpirationPolicy.
 */
export class RegisteredServiceServiceTicketExpirationPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceServiceTicketExpirationPolicy';

  numberOfUses: number;
  timeToLive: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceServiceTicketExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceServiceTicketExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceServiceTicketExpirationPolicy) {
    this.numberOfUses = policy?.numberOfUses;
    this.timeToLive = policy?.timeToLive;
    this['@class'] = RegisteredServiceServiceTicketExpirationPolicy.cName;
  }
}

/**
 * Data class for DefaultRegisteredServiceServiceTicketExpirationPolicy.
 */
export class DefaultRegisteredServiceServiceTicketExpirationPolicy extends RegisteredServiceServiceTicketExpirationPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceServiceTicketExpirationPolicy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceServiceTicketExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceServiceTicketExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceServiceTicketExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceServiceTicketExpirationPolicy.cName;
  }
}

/**
 * Global factory function to create a RegisteredServiceServiceTicketExpirationPolicy from js object.
 *
 * @param policy - policy as js object
 */
export function serviceTicketExpirationPolicy(policy?: any): RegisteredServiceServiceTicketExpirationPolicy {
  if (!policy || DefaultRegisteredServiceServiceTicketExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceServiceTicketExpirationPolicy(policy);
  }
  return policy;
}
