import {FormGroup} from '@angular/forms';
import {RegisteredServiceServiceTicketExpirationPolicy} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class ServiceTicketExpForm extends FormGroup {

  get numberOfUses() { return this.get('numberOfUses') as MgmtFormControl; }
  get timeToLive() { return this.get('timeToLive') as MgmtFormControl; }

  constructor(policy: RegisteredServiceServiceTicketExpirationPolicy) {
    super({
      numberOfUses: new MgmtFormControl(policy && policy.numberOfUses),
      timeToLive: new MgmtFormControl(policy && policy.timeToLive)
    });
  }

  mapForm(): RegisteredServiceServiceTicketExpirationPolicy {
    if (this.numberOfUses.value || this.timeToLive.value) {
      const policy = new RegisteredServiceServiceTicketExpirationPolicy();
      policy.timeToLive = this.timeToLive.value;
      policy.numberOfUses = this.numberOfUses.value;
      return policy;
    }
    return null;
  }
}
