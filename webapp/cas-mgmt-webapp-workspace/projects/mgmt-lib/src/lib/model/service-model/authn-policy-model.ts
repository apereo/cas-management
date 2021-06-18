export abstract class RegisteredServiceAuthenticationPolicy {
  static cName = 'org.apereo.cas.services.RegisteredServiceAuthenticationPolicy';

  requiredAuthenticationHandlers: string[];
  excludedAuthenticationHandlers: string[];
  criteria: RegisteredServiceAuthenticationPolicyCriteria;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === RegisteredServiceAuthenticationPolicy.cName;
  }

  protected constructor(policy?: RegisteredServiceAuthenticationPolicy) {
    this['@class'] = RegisteredServiceAuthenticationPolicy.cName;
  }
}

export enum CriteriaType {
  ALLOWED_AUTHN_HANDLERS,
  EXCLUDED_AUTHN_HANDLERS
}

export abstract class RegisteredServiceAuthenticationPolicyCriteria {
  static cName = 'org.apereo.cas.services.RegisteredServiceAuthenticationPolicyCriteria';
  static instanceOf(obj: RegisteredServiceAuthenticationPolicyCriteria): boolean {
    return obj && obj['@class'] === RegisteredServiceAuthenticationPolicyCriteria.cName;
  }
  protected constructor(policy?: RegisteredServiceAuthenticationPolicyCriteria) {
    this['@class'] = RegisteredServiceAuthenticationPolicyCriteria.cName;
  }
}

export class AllowedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria extends RegisteredServiceAuthenticationPolicyCriteria {
  static cName = 'org.apereo.cas.services.AllowedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria';

  static instanceOf(obj: RegisteredServiceAuthenticationPolicyCriteria): boolean {
    return obj && obj['@class'] === AllowedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria.cName;
  }

  constructor(policy?: RegisteredServiceAuthenticationPolicyCriteria) {
    super(policy)
    this['@class'] = AllowedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria.cName;
  }

}

export class ExcludedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria extends RegisteredServiceAuthenticationPolicyCriteria {
  static cName = 'org.apereo.cas.services.ExcludedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria';

  static instanceOf(obj: RegisteredServiceAuthenticationPolicyCriteria): boolean {
    return obj && obj['@class'] === ExcludedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria.cName;
  }

  constructor(policy?: RegisteredServiceAuthenticationPolicyCriteria) {
    super(policy)
    this['@class'] = ExcludedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria.cName;
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
    this.requiredAuthenticationHandlers = policy?.requiredAuthenticationHandlers || [];
    this.excludedAuthenticationHandlers = policy?.excludedAuthenticationHandlers || [];
    this.criteria = policy?.criteria;
  }
}

export function authenticationPolicy(policy?: any): RegisteredServiceAuthenticationPolicy {
  return new DefaultRegisteredServiceAuthenticationPolicy(policy);
}
