import {FormGroup} from '@angular/forms';
import {RegisteredServiceOAuthCodeExpirationPolicy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class CodeExpirationForm extends FormGroup {

  get numberOfUses() {return this.get('numberOfUses') as MgmtFormControl; }
  get timeToLive() { return this.get('timeToLive') as MgmtFormControl; }

  constructor(policy: RegisteredServiceOAuthCodeExpirationPolicy) {
    super({
      numberOfUses: new MgmtFormControl(policy?.numberOfUses),
      timeToLive: new MgmtFormControl(policy?.timeToLive)
    });
  }

  mapForm(): RegisteredServiceOAuthCodeExpirationPolicy {
    if (this.numberOfUses.value) {
      const policy = new RegisteredServiceOAuthCodeExpirationPolicy();
      policy.numberOfUses = this.numberOfUses.value;
      policy.timeToLive = this.timeToLive.value;
      return policy;
    }
    return null;
  }
}
