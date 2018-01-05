export abstract class RegisteredServiceMultifactorPolicy {
  multifactorAuthenticationProviders: String[];
  failureMode: String;
  principalAttributeNameTrigger: String;
  principalAttributeValueToMatch: String;
  bypassEnabled: boolean;

  constructor(policy?: RegisteredServiceMultifactorPolicy) {
    this.multifactorAuthenticationProviders = policy && policy.multifactorAuthenticationProviders;
    this.failureMode = policy ? policy.failureMode : 'NOT_SET';
    this.principalAttributeNameTrigger = policy && policy.principalAttributeNameTrigger;
    this.principalAttributeValueToMatch = policy && policy.principalAttributeValueToMatch;
    this.bypassEnabled = policy && policy.bypassEnabled;
  }
}

export class DefaultRegisteredServiceMultifactorPolicy extends RegisteredServiceMultifactorPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceMultifactorPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceMultifactorPolicy.cName;
  }

  constructor(policy?: RegisteredServiceMultifactorPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceMultifactorPolicy.cName;
  }
}

export class GroovyRegisteredServiceMultifactorPolicy extends RegisteredServiceMultifactorPolicy {
  static cName = 'org.apereo.cas.services.GroovyRegisteredServiceMultifactorPolicy';

  groovyScript: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovyRegisteredServiceMultifactorPolicy.cName;
  }

  constructor(policy?: RegisteredServiceMultifactorPolicy) {
    super(policy);
    this['@class'] = GroovyRegisteredServiceMultifactorPolicy.cName;
  }

}
