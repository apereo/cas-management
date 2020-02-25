import {FormGroup} from '@angular/forms';
import {RegisteredServiceOAuthRefreshTokenExpirationPolicy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class RefreshTokenExpirationForm extends FormGroup {

  get timeToKill() { return this.get('timeToKill') as MgmtFormControl; }

  constructor(policy: RegisteredServiceOAuthRefreshTokenExpirationPolicy) {
    super({
      timeToKill: new MgmtFormControl(policy?.timeToKill)
    });
  }

  mapForm(): RegisteredServiceOAuthRefreshTokenExpirationPolicy {
    if (this.timeToKill.value) {
      const policy = new RegisteredServiceOAuthRefreshTokenExpirationPolicy();
      policy.timeToKill = this.timeToKill.value;
      return policy;
    }
    return null;
  }
}
