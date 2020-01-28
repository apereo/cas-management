export class RegisteredServiceProxyTicketExpirationPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceProxyTicketExpirationPolicy';

  numberOfUses: number;
  timeToLive: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceProxyTicketExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceProxyTicketExpirationPolicy) {
    this.numberOfUses = (policy && policy.numberOfUses) || null;
    this.timeToLive = (policy && policy.timeToLive) || null;
    this['@class'] = RegisteredServiceProxyTicketExpirationPolicy.cName;
  }
}

export class DefaultRegisteredServiceProxyTicketExpirationPolicy extends RegisteredServiceProxyTicketExpirationPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceProxyTicketExpirationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceProxyTicketExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceProxyTicketExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceProxyTicketExpirationPolicy.cName;
  }
}

export function proxyTicketExpirationPolicy(policy?: any): RegisteredServiceProxyTicketExpirationPolicy {
  if (!policy || DefaultRegisteredServiceProxyTicketExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceProxyTicketExpirationPolicy(policy);
  }
  return policy;
}
