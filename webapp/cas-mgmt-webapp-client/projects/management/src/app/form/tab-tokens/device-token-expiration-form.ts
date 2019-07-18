import {MgmtFormGroup, RegisteredServiceOAuthDeviceTokenExpirationPolicy, MgmtFormControl} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';

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
