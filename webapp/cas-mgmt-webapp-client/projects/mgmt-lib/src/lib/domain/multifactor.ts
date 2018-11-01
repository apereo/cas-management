export abstract class RegisteredServiceMultifactorPolicy {

}

export class DefaultRegisteredServiceMultifactorPolicy extends RegisteredServiceMultifactorPolicy {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceMultifactorPolicy';

  multifactorAuthenticationProviders: String[];
  failureMode: String;
  principalAttributeNameTrigger: String;
  principalAttributeValueToMatch: String;
  bypassEnabled: boolean;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceMultifactorPolicy.cName;
  }

  constructor() {
    super();
    this.failureMode = 'NOT_SET';
    this['@class'] = DefaultRegisteredServiceMultifactorPolicy.cName;
  }
}

export class GroovyRegisteredServiceMultifactorPolicy extends RegisteredServiceMultifactorPolicy {
  static cName = 'org.apereo.cas.services.GroovyRegisteredServiceMultifactorPolicy';

  groovyScript: String;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovyRegisteredServiceMultifactorPolicy.cName;
  }

  constructor() {
    super();
    this['@class'] = GroovyRegisteredServiceMultifactorPolicy.cName;
  }

}
