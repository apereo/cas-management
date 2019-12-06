export abstract class RegisteredServiceDelegatedAuthenticationPolicy {
  allowedProviders: string[];
  permitUndefined: boolean;
  exclusive: boolean;

  constructor(policy?: RegisteredServiceDelegatedAuthenticationPolicy) {
    this.allowedProviders = (policy && policy.allowedProviders) || null;
    this.permitUndefined = policy ? policy.permitUndefined : true;
    this.exclusive = policy ? policy.exclusive : false;
  }
}

export class DefaultRegisteredServiceDelegatedAuthenticationPolicy extends RegisteredServiceDelegatedAuthenticationPolicy {
    static cName = 'org.apereo.cas.services.DefaultRegisteredServiceDelegatedAuthenticationPolicy';


    static instanceOf(obj: any): boolean {
        return obj && obj['@class'] === DefaultRegisteredServiceDelegatedAuthenticationPolicy.cName;
    }

    constructor(policy?: RegisteredServiceDelegatedAuthenticationPolicy) {
      super(policy);
      this['@class'] = DefaultRegisteredServiceDelegatedAuthenticationPolicy.cName;
    }
}
