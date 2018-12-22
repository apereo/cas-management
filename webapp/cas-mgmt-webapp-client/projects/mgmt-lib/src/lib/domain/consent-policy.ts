export class RegisteredServiceConsentPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceConsentPolicy';

  enabled: boolean;
  excludedAttributes: string[];
  includeOnlyAttributes: string[];

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceConsentPolicy.cName
  }

  constructor(policy?: RegisteredServiceConsentPolicy) {
    this.enabled = (policy && policy.enabled) || true;
    this.excludedAttributes = (policy && policy.excludedAttributes) || null;
    this.includeOnlyAttributes = (policy && policy.includeOnlyAttributes) || null;
    this['@class'] = RegisteredServiceConsentPolicy.cName;
  }
}

export class DefaultRegisteredServiceConsentPolicy extends RegisteredServiceConsentPolicy {
  static cName = 'org.apereo.cas.services.consent.DefaultRegisteredServiceConsentPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceConsentPolicy.cName;
  }

  constructor(policy?: RegisteredServiceConsentPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceConsentPolicy.cName;
  }
}
