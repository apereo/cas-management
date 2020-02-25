import {FormArray, FormGroup} from '@angular/forms';
import {
  AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy,
  BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy,
  ChainingRegisteredServiceSingleSignOnParticipationPolicy,
  LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy,
  NeverRegisteredServiceSingleSignOnParticipationPolicy,
  RegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType,
} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class SsoPolicyForm extends FormGroup {

  constructor(form: any, public type: SsoPolicyType) {
    super(form);
  }

  mapForm(): RegisteredServiceSingleSignOnParticipationPolicy {
    return null;
  }
}

export class BaseDateTimeSsoForm extends SsoPolicyForm {

  get timeUnit() { return this.get('timeUnit') as MgmtFormControl; }
  get timeValue() { return this.get('timeValue') as MgmtFormControl; }

  constructor(policy: BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy, type: SsoPolicyType) {
    super({
      timeUnit: new MgmtFormControl(policy?.timeUnit),
      timeValue: new MgmtFormControl(policy?.timeValue)
    }, type);
  }
}

export class LastUsedTimeSsoForm extends BaseDateTimeSsoForm {

  constructor(policy: LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy, SsoPolicyType.LAST_USED);
  }

  mapForm(): LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy {
    const policy = new LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy();
    policy.timeUnit = this.timeUnit.value;
    policy.timeValue = this.timeValue.value;
    return policy;
  }

}

export class AuthTimeSsoForm extends BaseDateTimeSsoForm {

  constructor(policy: AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy, SsoPolicyType.AUTH_DATE);
  }

  mapForm(): AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy {
    const policy = new AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy();
    policy.timeUnit = this.timeUnit.value;
    policy.timeValue = this.timeValue.value;
    return policy;
  }

}

export class ChainingSsoForm extends SsoPolicyForm {

  get policies() { return this.get('policies') as FormArray; }
  get forms() { return this.policies.controls as BaseDateTimeSsoForm[]; }

  constructor(policy: ChainingRegisteredServiceSingleSignOnParticipationPolicy) {
    super({
      policies: new FormArray([])
    }, SsoPolicyType.CHAINING);
  }
}

export class NeverSsoForm extends SsoPolicyForm {
  constructor(policy: NeverRegisteredServiceSingleSignOnParticipationPolicy) {
    super({}, SsoPolicyType.NEVER);
  }
}

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



