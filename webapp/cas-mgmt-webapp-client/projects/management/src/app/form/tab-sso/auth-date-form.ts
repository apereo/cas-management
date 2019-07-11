import {DateTimePolicyForm} from '@app/form/tab-sso/date-time-policy-form';
import {
  AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType
} from 'mgmt-lib';
import {FormControl} from '@angular/forms';

export class AuthDateForm extends DateTimePolicyForm<AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy> {

  type = SsoPolicyType.AUTH_DATE;

  constructor(public policy: AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    this.addControl('type', new FormControl(this.type));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['type'] = this.type;
    return frm;
  }

  mapForm(policy: AuthenticationDateRegisteredServiceSingleSignOnParticipationPolicy) {
    super.mapForm(policy);
  }
}
