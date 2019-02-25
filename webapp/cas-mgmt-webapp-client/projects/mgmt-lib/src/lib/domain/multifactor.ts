export abstract class RegisteredServiceMultifactorPolicy {

}

export class DefaultRegisteredServiceMultifactorPolicy extends RegisteredServiceMultifactorPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceMultifactorPolicy';

  multifactorAuthenticationProviders: string[];
  failureMode: string;
  principalAttributeNameTrigger: string;
  principalAttributeValueToMatch: string;
  bypassEnabled: boolean;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceMultifactorPolicy.cName;
  }

  constructor(policy?: RegisteredServiceMultifactorPolicy) {
    super();
    const p: DefaultRegisteredServiceMultifactorPolicy = policy as DefaultRegisteredServiceMultifactorPolicy;
    this.multifactorAuthenticationProviders = (p && p.multifactorAuthenticationProviders) || null;
    this.failureMode = (p && p.failureMode) ||  null;
    this.principalAttributeNameTrigger = (p && p.principalAttributeNameTrigger) || null;
    this.principalAttributeValueToMatch = (p && p.principalAttributeValueToMatch) || null;
    this.bypassEnabled = (p && p.bypassEnabled) || null;
    this['@class'] = DefaultRegisteredServiceMultifactorPolicy.cName;
  }
}

export class GroovyRegisteredServiceMultifactorPolicy extends RegisteredServiceMultifactorPolicy {
  static cName = 'org.apereo.cas.services.GroovyRegisteredServiceMultifactorPolicy';

  groovyScript: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovyRegisteredServiceMultifactorPolicy.cName;
  }

  constructor(policy?: RegisteredServiceMultifactorPolicy) {
    super();
    const p: GroovyRegisteredServiceMultifactorPolicy = policy as GroovyRegisteredServiceMultifactorPolicy;
    this.groovyScript = (p && p.groovyScript) || null;
    this['@class'] = GroovyRegisteredServiceMultifactorPolicy.cName;
  }

}

export enum MfaPolicyType {
  DEFAULT,
  GROOVY
}
