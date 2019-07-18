export class RegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceSingleSignOnParticipationPolicy';

  order: number;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    this.order = (policy && policy.order) || null;
    this['@class'] = RegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

export class NeverRegisteredServiceSingleSignOnParticipationPolicy extends RegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.NeverRegisteredServiceSingleSignOnParticipationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === NeverRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    this['@class'] = NeverRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

export class BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy extends RegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy';

  timeUnit: string;
  timeValue: number;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    const p = policy && BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)
      ? policy as BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy : undefined;
    this.timeValue = (p && p.timeValue) || null;
    this.timeUnit = (p && p.timeUnit) || null;
    this['@class'] = BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

export class AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy extends BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    this['@class'] = AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

export class LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy extends BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    this['@class'] = LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

export class ChainingRegisteredServiceSingleSignOnParticipationPolicy extends RegisteredServiceSingleSignOnParticipationPolicy {
  static cName = 'org.apereo.cas.services.ChainingRegisteredServiceSingleSignOnParticipationPolicy';

  policies: RegisteredServiceSingleSignOnParticipationPolicy[];

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ChainingRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }

  constructor(policy?: RegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    const p = policy && ChainingRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)
      ? policy as ChainingRegisteredServiceSingleSignOnParticipationPolicy : undefined;
    this.policies = (p && p.policies) || [];
    this['@class'] = ChainingRegisteredServiceSingleSignOnParticipationPolicy.cName;
  }
}

export enum SsoPolicyType {
  NEVER,
  AUTH_DATE,
  LAST_USED,
  CHAINING
}

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
