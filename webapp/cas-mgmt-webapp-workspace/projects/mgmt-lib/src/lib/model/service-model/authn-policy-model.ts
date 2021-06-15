export abstract class RegisteredServiceAuthenticationPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceAuthenticationPolicy';

  requiredAuthenticationHandlers: string[];
  excludedAuthenticationHandlers: string[];

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceAuthenticationPolicy.cName;
  }

  protected constructor(policy?: RegisteredServiceAuthenticationPolicy) {
    this['@class'] = RegisteredServiceAuthenticationPolicy.cName;
  }
}

export class DefaultRegisteredServiceAuthenticationPolicy extends RegisteredServiceAuthenticationPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceAuthenticationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceAuthenticationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceAuthenticationPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceAuthenticationPolicy.cName;
  }
}


export function authenticationPolicy(policy?: any): RegisteredServiceAuthenticationPolicy {
  return new DefaultRegisteredServiceAuthenticationPolicy(policy);
}
