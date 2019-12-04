export class RegisteredServiceServiceTicketExpirationPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceServiceTicketExpirationPolicy';

  numberOfUses: number;
  timeToLive: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceServiceTicketExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceServiceTicketExpirationPolicy) {
    this.numberOfUses = (policy && policy.numberOfUses) || null;
    this.timeToLive = (policy && policy.timeToLive) || null;
    this['@class'] = RegisteredServiceServiceTicketExpirationPolicy.cName;
  }
}

export class DefaultRegisteredServiceServiceTicketExpirationPolicy extends RegisteredServiceServiceTicketExpirationPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceServiceTicketExpirationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceServiceTicketExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceServiceTicketExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceServiceTicketExpirationPolicy.cName;
  }
}

export function serviceTicketExpirationPolicy(policy?: any): RegisteredServiceServiceTicketExpirationPolicy {
  if (!policy || DefaultRegisteredServiceServiceTicketExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceServiceTicketExpirationPolicy(policy);
  }
  return policy;
}
