import {FormGroup} from '@angular/forms';
import {RegisteredServiceOAuthDeviceTokenExpirationPolicy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class DeviceTokenExpirationForm extends FormGroup {

  get timeToKill() { return this.get('timeToKill') as MgmtFormControl; }

  constructor(policy: RegisteredServiceOAuthDeviceTokenExpirationPolicy) {
    super({
      timeToKill: new MgmtFormControl(policy?.timeToKill)
    });
  }

  mapForm(): RegisteredServiceOAuthDeviceTokenExpirationPolicy {
    if (this.timeToKill.value) {
      const policy = new RegisteredServiceOAuthDeviceTokenExpirationPolicy();
      policy.timeToKill = this.timeToKill.value;
      return policy;
    }
    return null;
  }
}
