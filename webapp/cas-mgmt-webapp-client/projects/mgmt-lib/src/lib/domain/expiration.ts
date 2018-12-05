export abstract class RegisteredServiceExpirationPolicy {
  expirationDate: String;
  deleteWhenExpired: boolean;
  notifyWhenDeleted: boolean;

  constructor(policy?: RegisteredServiceExpirationPolicy) {
    this.notifyWhenDeleted = (policy && policy.notifyWhenDeleted) || false;
    this.deleteWhenExpired = (policy && policy.deleteWhenExpired) || false;
    this.expirationDate = (policy && policy.expirationDate) || null;
  }
}

export class DefaultRegisteredServiceExpirationPolicy extends RegisteredServiceExpirationPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceExpirationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceExpirationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceExpirationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceExpirationPolicy.cName;
  }
}
