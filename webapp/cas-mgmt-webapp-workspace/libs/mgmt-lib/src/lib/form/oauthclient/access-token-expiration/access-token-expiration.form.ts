import {FormGroup} from '@angular/forms';
import {RegisteredServiceOAuthAccessTokenExpirationPolicy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class AccessTokenExpirationForm extends FormGroup {

  get maxTimeToLive() { return this.get('maxTimeToLive') as MgmtFormControl; }
  get timeToKill() { return this.get('timeToKill') as MgmtFormControl; }

  constructor(policy: RegisteredServiceOAuthAccessTokenExpirationPolicy) {
    super({
      maxTimeToLive: new MgmtFormControl(policy && policy.maxTimeToLive),
      timeToKill: new MgmtFormControl(policy && policy.timeToKill)
    });
  }

  mapForm(): RegisteredServiceOAuthAccessTokenExpirationPolicy {
    if (this.maxTimeToLive.value) {
      const policy = new RegisteredServiceOAuthAccessTokenExpirationPolicy();
      policy.timeToKill = this.timeToKill.value;
      policy.maxTimeToLive = this.maxTimeToLive.value;
      return policy;
    }
    return null;
  }
}
