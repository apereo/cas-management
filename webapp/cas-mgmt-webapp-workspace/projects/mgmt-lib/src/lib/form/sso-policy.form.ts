import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {
  AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy,
  BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy,
  ChainingRegisteredServiceSingleSignOnParticipationPolicy,
  LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy,
  NeverRegisteredServiceSingleSignOnParticipationPolicy,
  RegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType,
} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Abstract form group for SSO Policy.
 */
export class SsoPolicyForm extends FormGroup {

  constructor(form: any, public type: SsoPolicyType) {
    super(form);
  }

  /**
   * Maps the form values to RegisteredServiceSingleSignOnParticipationPolicy.
   */
  map(): RegisteredServiceSingleSignOnParticipationPolicy {
    return null;
  }
}

/**
 * Base form group for displaying and updating SSO policies that are time based.
 */
export class BaseDateTimeSsoForm extends SsoPolicyForm {

  get timeUnit() { return this.get('timeUnit') as FormControl; }
  get timeValue() { return this.get('timeValue') as FormControl; }

  constructor(policy: BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy, type: SsoPolicyType) {
    super({
      timeUnit: new FormControl(policy?.timeUnit),
      timeValue: new FormControl(policy?.timeValue)
    }, type);
  }
}

/**
 * Form group for display and updating LastUsed SSO policy.
 */
export class LastUsedTimeSsoForm extends BaseDateTimeSsoForm {

  constructor(policy: LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy, SsoPolicyType.LAST_USED);
  }

  /**
   * Maps the form values to LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.
   */
  map(): LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy {
    const policy = new LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy();
    policy.timeUnit = this.timeUnit.value;
    policy.timeValue = this.timeValue.value;
    return policy;
  }

}

/**
 * Form group for displaying and updating AuthTime SSO policies.
 */
export class AuthTimeSsoForm extends BaseDateTimeSsoForm {

  constructor(policy: AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy, SsoPolicyType.AUTH_DATE);
  }

  /**
   * Maps the form values to AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.
   */
  map(): AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy {
    const policy = new AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy();
    policy.timeUnit = this.timeUnit.value;
    policy.timeValue = this.timeValue.value;
    return policy;
  }

}

/**
 * Form group for displaying and updating Chaining SSO Policies.
 */
export class ChainingSsoForm extends SsoPolicyForm {

  get policies() { return this.get('policies') as FormArray; }
  get forms() { return this.policies.controls as BaseDateTimeSsoForm[]; }

  constructor(policy: ChainingRegisteredServiceSingleSignOnParticipationPolicy) {
    super({
      policies: new FormArray([])
    }, SsoPolicyType.CHAINING);
  }
}

/**
 * Form group for displaying and updating Never SSO policy.
 */
export class NeverSsoForm extends SsoPolicyForm {
  constructor(policy: NeverRegisteredServiceSingleSignOnParticipationPolicy) {
    super({}, SsoPolicyType.NEVER);
  }
}

/**
 * Global factory function for creating SSO Policies.
 *
 * @param policy - sso policy
 */
export function createSsoForm(policy: RegisteredServiceSingleSignOnParticipationPolicy): SsoPolicyForm {
  if (policy && NeverRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
    return new NeverSsoForm(policy);
  }
  if (policy && LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
    return new LastUsedTimeSsoForm(policy as LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy);
  }
  if (policy && AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
    return new AuthTimeSsoForm(policy as AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy);
  }
  if (policy && ChainingRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
    return new ChainingSsoForm(policy as ChainingRegisteredServiceSingleSignOnParticipationPolicy);
  }
  return new ChainingSsoForm(new ChainingRegisteredServiceSingleSignOnParticipationPolicy());
}



