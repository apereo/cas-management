import {FormGroup} from '@angular/forms';
import {RegisteredServiceOAuthDeviceTokenExpirationPolicy} from 'domain-lib';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';

export class DeviceTokenExpirationForm extends FormGroup implements MgmtFormGroup<RegisteredServiceOAuthDeviceTokenExpirationPolicy> {

  constructor(public policy: RegisteredServiceOAuthDeviceTokenExpirationPolicy) {
    super({
      timeToKill: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      timeToKill: this.policy.timeToKill
    };
  }

  mapForm(policy: RegisteredServiceOAuthDeviceTokenExpirationPolicy): any {
    const frm = this.value;
    policy.timeToKill = frm.timeToKill;
  }

}
