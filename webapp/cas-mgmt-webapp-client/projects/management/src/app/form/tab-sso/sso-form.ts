import {FormArray, FormGroup} from '@angular/forms';
import {MgmtFormControl, MgmtFormGroup} from 'mgmt-lib';
import {
  AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy,
  LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy,
  ChainingRegisteredServiceSingleSignOnParticipationPolicy,
  RegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType, AbstractRegisteredService
} from 'domain-lib';
import {AuthDateForm} from '@app/form/tab-sso/auth-date-form';
import {LastUsedForm} from '@app/form/tab-sso/last-used-form';

export class SsoForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  policies: FormArray;

  constructor(public service: AbstractRegisteredService) {
    super({});
    this.policies = this.getPolicies(this.service.singleSignOnParticipationPolicy);
    this.addControl('policies', this.policies);
    this.addControl('ssoEnabled', new MgmtFormControl(this.service.accessStrategy.ssoEnabled));
  }

  formMap(): any {
    return {};
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.value;
    this.service.accessStrategy.ssoEnabled = frm.ssoEnabled;
    this.service.singleSignOnParticipationPolicy = null;
    if (frm.ssoEnabled) {
      if (this.policies.length > 1) {
        const policy = new ChainingRegisteredServiceSingleSignOnParticipationPolicy();
        for (const p of this.policies.controls) {
          if (p.get('type').value === SsoPolicyType.LAST_USED) {
            const l = new LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy();
            (<LastUsedForm>p).mapForm(l);
            policy.policies.push(l);
          }
          if (p.get('type').value === SsoPolicyType.AUTH_DATE) {
            const a = new AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy();
            (<AuthDateForm>p).mapForm(a);
            policy.policies.push(a);
          }
        }
        this.service.singleSignOnParticipationPolicy = policy;
      } else if (this.policies.length > 0) {
        const p = this.policies.at(0);
        if (p.get('type').value === SsoPolicyType.LAST_USED) {
          const l = new LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy();
          (<LastUsedForm>p).mapForm(l);
          this.service.singleSignOnParticipationPolicy = l;
        }
        if (p.get('type').value === SsoPolicyType.AUTH_DATE) {
          const a = new AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy();
          (<AuthDateForm>p).mapForm(a);
          this.service.singleSignOnParticipationPolicy = a;
        }
      }
    }
  }

  addPolicy(type: SsoPolicyType) {
    if (type === SsoPolicyType.AUTH_DATE) {
      this.policies.push(new AuthDateForm(new AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy()));
    }
    if (type === SsoPolicyType.LAST_USED) {
      this.policies.push(new LastUsedForm(new LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy()));
    }
    this.markAsDirty();
    this.markAsTouched();
  }

  getPolicies(policy: RegisteredServiceSingleSignOnParticipationPolicy): FormArray {
    const policies = new FormArray([]);
    if (ChainingRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
      const participationPolicies = (<ChainingRegisteredServiceSingleSignOnParticipationPolicy>this.service.singleSignOnParticipationPolicy).policies;
      for (const p of participationPolicies) {
        if (AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(p)) {
          policies.push(new AuthDateForm(p as AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy));
        }
        if (LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(p)) {
          policies.push(new LastUsedForm(p as LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy));
        }
      }
    } else if (LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
      policies.push(new LastUsedForm(policy as LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy));
    } else if (AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(policy)) {
      policies.push(new AuthDateForm(policy as AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy))
    }
    return policies
  }
}
