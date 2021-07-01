export enum ConsentStatus {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  UNDEFINED = 'UNDEFINED'
}

/**
 * Data class for RegisteredServiceConsentPolicy.
 */

export class RegisteredServiceConsentPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceConsentPolicy';

  status: ConsentStatus;
  excludedAttributes: string[];
  includeOnlyAttributes: string[];

  /**
   * Returns true if the passed object is an instance of RegisteredServiceConsentPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceConsentPolicy.cName;
  }

  constructor(policy?: RegisteredServiceConsentPolicy) {
    this.status = policy?.status || ConsentStatus.UNDEFINED;
    this.excludedAttributes = policy?.excludedAttributes;
    this.includeOnlyAttributes = policy?.includeOnlyAttributes;
    this['@class'] = RegisteredServiceConsentPolicy.cName;
  }
}

/**
 * Data class for DefaultRegisteredServiceConsentPolicy.
 */
export class DefaultRegisteredServiceConsentPolicy extends RegisteredServiceConsentPolicy {
  static cName = 'org.apereo.cas.services.consent.DefaultRegisteredServiceConsentPolicy';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceConsentPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceConsentPolicy.cName;
  }

  constructor(policy?: RegisteredServiceConsentPolicy) {
    super(policy);
    this['@class'] = DefaultRegisteredServiceConsentPolicy.cName;
  }
}

/**
 * Global factory function for creating RegisteredConsentPolicy from js object.
 *
 * @param policy - Policy as js object
 */
export function consentPolicyFactory(policy?: any): RegisteredServiceConsentPolicy  {
  if (!policy || DefaultRegisteredServiceConsentPolicy.instanceOf(policy)) {
    return new DefaultRegisteredServiceConsentPolicy(policy);
  }
  return policy;

}
