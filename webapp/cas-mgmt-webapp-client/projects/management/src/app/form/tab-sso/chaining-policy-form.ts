import {FormArray, FormControl} from '@angular/forms';
import {
  AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy,
  BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy,
  ChainingRegisteredServiceSingleSignOnParticipationPolicy,
  LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType
} from 'mgmt-lib';
import {LastUsedForm} from '@app/form/tab-sso/last-used-form';
import {AuthDateForm} from '@app/form/tab-sso/auth-date-form';
import {BaseSsoPolicyForm} from '@app/form/tab-sso/base-form';

export class ChainingPolicyForm extends BaseSsoPolicyForm<ChainingRegisteredServiceSingleSignOnParticipationPolicy> {

  type = SsoPolicyType.CHAINING;

  constructor(public policy: ChainingRegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    const policies = new FormArray([]);
    this.addControl('policies', policies);
    this.addControl('type', new FormControl(this.type));
    if (policy && policy.policies) {
      for (const p of policy.policies) {
        if (LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(p)) {
          policies.push(new LastUsedForm(p as LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy));
        }
        if (AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(p)) {
          policies.push(new AuthDateForm(p as AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy));
        }
      }
    }
  }

  push(p: BaseSsoPolicyForm<BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy>) {
    (<FormArray>this.get('policies')).push(p);
  }

  size(): number {
    return (<FormArray>this.get('policies')).length;
  }

  atIndex(index: number): BaseSsoPolicyForm<BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy> {
    return (<FormArray>this.get('policies')).at(index) as BaseSsoPolicyForm<BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy>;
  }

  mapForm(policy: ChainingRegisteredServiceSingleSignOnParticipationPolicy) {
    policy.policies = [];
    let i = 0;
    for (const c of (<FormArray>this.get('policies')).controls) {
      if (c.get('type').value === SsoPolicyType.LAST_USED) {
        const p = new LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy();
        (<LastUsedForm>c).mapForm(p);
        p.order = i;
        policy.policies.push(p);
      }
      if (c.get('type').value === SsoPolicyType.AUTH_DATE) {
        const p = new AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy();
        (<AuthDateForm>c).mapForm(p);
        p.order = i;
        policy.policies.push(p);
      }
      i++;
    }
  }
}
