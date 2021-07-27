import {FormControl, FormGroup} from '@angular/forms';
import { RegisteredServiceOAuthDeviceTokenExpirationPolicy, deviceTokenExpirationPolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Device Token Expiration policy.
 *
 * @author Travis Schmidt
 */
export class DeviceTokenExpirationForm extends FormGroup {

  get timeToKill() { return this.get('timeToKill') as FormControl; }

  constructor(policy: RegisteredServiceOAuthDeviceTokenExpirationPolicy) {
    super({
      timeToKill: new FormControl(policy?.timeToKill)
    });
  }

  /**
   * Maps the form values to RegisteredServiceOAuthDeviceTokenExpirationPolicy.
   */
  map(): RegisteredServiceOAuthDeviceTokenExpirationPolicy {
    if (this.timeToKill.value) {
      const policy = deviceTokenExpirationPolicy();
      policy.timeToKill = this.timeToKill.value;
      return policy;
    }
    return null;
  }
}
