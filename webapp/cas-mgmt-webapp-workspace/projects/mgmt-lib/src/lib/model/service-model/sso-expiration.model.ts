/**
 * Data class for RegisteredServiceSingleSignOnParticipationPolicy.
 */
export class RegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceSingleSignOnParticipationPolicy';

  order: number;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceSingleSignOnParticipationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    this.order = policy?.order;
    this['@class'] = RegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

/**
 * Data class for NeverRegisteredServiceSingleSignOnParticipationPolicy.
 */
export class NeverRegisteredServiceSingleSignOnParticipationPolicy extends RegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.NeverRegisteredServiceSingleSignOnParticipationPolicy';

  /**
   * Returns true if the passed object is an instance of NeverRegisteredServiceSingleSignOnParticipationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === NeverRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    this['@class'] = NeverRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

/**
 * Data class for NeverRegisteredServiceSingleSignOnParticipationPolicy.
 */
export class BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy extends RegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy';

  timeUnit: string;
  timeValue: number;

  /**
   * Returns true if the passed object is an instance of NeverRegisteredServiceSingleSignOnParticipationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    const p = policy && BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)
      ? policy as BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy : undefined;
    this.timeValue = p?.timeValue;
    this.timeUnit = p?.timeUnit;
    this['@class'] = BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

/**
 * Data class for NeverRegisteredServiceSingleSignOnParticipationPolicy.
 */
export class AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy
  extends BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy';

  /**
   * Returns true if the passed object is an instance of NeverRegisteredServiceSingleSignOnParticipationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    this['@class'] = AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

/**
 * Data class for NeverRegisteredServiceSingleSignOnParticipationPolicy.
 */
export class LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy
  extends BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy';

  /**
   * Returns true if the passed object is an instance of NeverRegisteredServiceSingleSignOnParticipationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    this['@class'] = LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

/**
 * Data class for NeverRegisteredServiceSingleSignOnParticipationPolicy.
 */
export class ChainingRegisteredServiceSingleSignOnParticipationPolicy extends RegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.ChainingRegisteredServiceSingleSignOnParticipationPolicy';

  policies: RegisteredServiceSingleSignOnParticipationPolicy[];

  /**
   * Returns true if the passed object is an instance of NeverRegisteredServiceSingleSignOnParticipationPolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ChainingRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    const p = policy && ChainingRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)
      ? policy as ChainingRegisteredServiceSingleSignOnParticipationPolicy : undefined;
    this.policies = p?.policies ?? [];
    this['@class'] = ChainingRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

export enum SsoPolicyType {
  NEVER,
  AUTH_DATE,
  LAST_USED,
  CHAINING
}

/**
 * Global factory function to create RegisteredServiceSingleSignOnParticipationPolicy from js object.
 *
 * @param policy - Policy as js object
 * @param type - SsoPolicyType
 */
export function ssoParticipationPolicy(policy?: any, type?: SsoPolicyType): RegisteredServiceSingleSignOnParticipationPolicy {
  if (type === SsoPolicyType.NEVER || NeverRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
    return new NeverRegisteredServiceSingleSignOnParticipationPolicy(policy);
  }
  if (type === SsoPolicyType.AUTH_DATE || AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
    return new AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy(policy);
  }
  if (type === SsoPolicyType.LAST_USED || LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
    return new LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy(policy);
  }
  if (type === SsoPolicyType.CHAINING || ChainingRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
    return new ChainingRegisteredServiceSingleSignOnParticipationPolicy(policy);
  }
  if (!policy) {
    return null;
  }
  return policy;
}
