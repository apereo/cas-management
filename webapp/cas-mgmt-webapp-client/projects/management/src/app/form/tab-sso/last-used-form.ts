import {DateTimePolicyForm} from '@app/form/tab-sso/date-time-policy-form';
import {
  LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType
} from 'mgmt-lib';
import {FormControl} from '@angular/forms';

export class LastUsedForm extends DateTimePolicyForm<LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy> {

  type = SsoPolicyType.LAST_USED;

  constructor(public policy: LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy) {
    super(policy);
    this.addControl('type', new FormControl(this.type));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['type'] = this.type;
    return frm;
  }

  mapForm(policy: LastUsedTimeRegisteredServiceSingleSignOnParticipationPolicy) {
    super.mapForm(policy);
  }
}
