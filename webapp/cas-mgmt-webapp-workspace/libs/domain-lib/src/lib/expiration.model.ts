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

export function expirationPolicyFactory(policy?: any) {
  if (!policy || DefaultRegisteredServiceExpirationPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceExpirationPolicy(policy);
  }
  return policy;

}
