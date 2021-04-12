/**
 * Data class for RegisteredServiceProxyTicketExpirationPolicy.
 */
export class RegisteredServiceProxyTicketExpirationPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceProxyTicketExpirationPolicy';

  numberOfUses: number;
  timeToLive: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceProxyTicketExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceProxyTicketExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceProxyTicketExpirationPolicy) {
    this.numberOfUses = policy?.numberOfUses;
    this.timeToLive = policy?.timeToLive;
    this['@class'] = RegisteredServiceProxyTicketExpirationPolicy.cName;
  }
}

/**
 * Data class for DefaultRegisteredServiceProxyTicketExpirationPolicy.
 */
export class DefaultRegisteredServiceProxyTicketExpirationPolicy extends RegisteredServiceProxyTicketExpirationPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceProxyTicketExpirationPolicy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceProxyTicketExpirationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceProxyTicketExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceProxyTicketExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceProxyTicketExpirationPolicy.cName;
  }
}

/**
 * Global factory function to create RegisteredServiceProxyTicketExpirationPolicy from js object.
 *
 * @param policy - policy as js object
 */
export function proxyTicketExpirationPolicy(policy?: any): RegisteredServiceProxyTicketExpirationPolicy {
  if (!policy || DefaultRegisteredServiceProxyTicketExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceProxyTicketExpirationPolicy(policy);
  }
  return policy;
}
