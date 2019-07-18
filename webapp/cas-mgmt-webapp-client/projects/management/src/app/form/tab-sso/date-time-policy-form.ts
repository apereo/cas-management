import {FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  MgmtFormControl,
  BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType
} from 'mgmt-lib';
import {BaseSsoPolicyForm} from '@app/form/tab-sso/base-form';

export class DateTimePolicyForm<T extends BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy> extends BaseSsoPolicyForm<T> {

  constructor(public policy: BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy) {
    super({});
    this.addControl('timeValue', new MgmtFormControl(null));
    this.addControl('timeUnit', new MgmtFormControl(null));
    this.addControl('order', new MgmtFormControl(null));
  }

  formMap(): any {
    return {
      timeValue: this.policy.timeValue,
      timeUnit: this.policy.timeUnit,
      order: this.policy.order
    };
  }

  mapForm(policy: BaseDateTimeRegisteredServiceSingleSignOnParticipationPolicy) {
    const frm = this.value;
    policy.timeUnit = frm.timeUnit;
    policy.timeValue = frm.timeValue;
    policy.order = frm.order;
  }
}
