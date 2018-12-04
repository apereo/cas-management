export abstract class RegisteredServiceDelegatedAuthenticationPolicy {
  allowedProviders: String[];

  constructor(policy?: RegisteredServiceDelegatedAuthenticationPolicy) {
    this.allowedProviders = (policy && policy.allowedProviders) || null;
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
