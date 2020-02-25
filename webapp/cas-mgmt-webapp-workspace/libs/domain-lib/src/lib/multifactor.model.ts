export abstract class RegisteredServiceMultifactorPolicy {

}

export class DefaultRegisteredServiceMultifactorPolicy extends RegisteredServiceMultifactorPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceMultifactorPolicy';

  multifactorAuthenticationProviders: string[];
  failureMode: string;
  principalAttributeNameTrigger: string;
  principalAttributeValueToMatch: string;
  bypassEnabled: boolean;
  forceExecution: boolean;
  bypassTrustedDeviceEnabled: boolean;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceMultifactorPolicy.cName;
  }

  constructor(policy?: RegisteredServiceMultifactorPolicy) {
    super();
    const p: DefaultRegisteredServiceMultifactorPolicy = DefaultRegisteredServiceMultifactorPolicy.instanceOf(policy)
      ? policy as DefaultRegisteredServiceMultifactorPolicy : undefined;
    this.multifactorAuthenticationProviders = p?.multifactorAuthenticationProviders;
    this.failureMode = p?.failureMode;
    this.principalAttributeNameTrigger = p?.principalAttributeNameTrigger;
    this.principalAttributeValueToMatch = p?.principalAttributeValueToMatch;
    this.bypassEnabled = p?.bypassEnabled ?? false;
    this.forceExecution = p?.forceExecution ?? false;
    this.bypassTrustedDeviceEnabled = p?.bypassTrustedDeviceEnabled ?? false;
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
    const p: GroovyRegisteredServiceMultifactorPolicy = GroovyRegisteredServiceMultifactorPolicy.instanceOf(policy)
      ? policy as GroovyRegisteredServiceMultifactorPolicy : undefined;
    this.groovyScript = p?.groovyScript;
    this['@class'] = GroovyRegisteredServiceMultifactorPolicy.cName;
  }

}

export enum MfaPolicyType {
  DEFAULT,
  GROOVY
}

export function mfaPolicyFactory(policy?: any, type?: MfaPolicyType): RegisteredServiceMultifactorPolicy {
  if (type === MfaPolicyType.DEFAULT || (!type && DefaultRegisteredServiceMultifactorPolicy.instanceOf(policy))) {
    return new DefaultRegisteredServiceMultifactorPolicy(policy);
  }
  if (type === MfaPolicyType.GROOVY  || (!type && GroovyRegisteredServiceMultifactorPolicy.instanceOf(policy))) {
    return new GroovyRegisteredServiceMultifactorPolicy(policy);
  }
  return policy;
}
