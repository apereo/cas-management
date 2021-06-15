export class DefaultRegisteredServiceAuthenticationPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceAuthenticationPolicy';

  requiredAuthenticationHandlers: string[];
  excludedAuthenticationHandlers: string[];

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceAuthenticationPolicy.cName;
  }

  constructor(policy?: DefaultRegisteredServiceAuthenticationPolicy) {
    this['@class'] = DefaultRegisteredServiceAuthenticationPolicy.cName;
  }
}
