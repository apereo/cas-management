import {FormGroup} from '@angular/forms';
import {RegisteredServiceProxyTicketExpirationPolicy} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class ProxyTicketExpForm extends FormGroup {

  get numberOfUses() { return this.get('numberOfUses') as MgmtFormControl; }
  get timeToLive() { return this.get('timeToLive') as MgmtFormControl; }

  constructor(policy: RegisteredServiceProxyTicketExpirationPolicy) {
    super({
      numberOfUses: new MgmtFormControl(policy && policy.numberOfUses),
      timeToLive: new MgmtFormControl(policy && policy.timeToLive)
    });
  }

  mapForm(): RegisteredServiceProxyTicketExpirationPolicy {
    if (this.numberOfUses.value || this.timeToLive.value) {
      const policy = new RegisteredServiceProxyTicketExpirationPolicy();
      policy.timeToLive = this.timeToLive.value;
      policy.numberOfUses = this.numberOfUses.value;
      return policy;
    }
    return null;
  }
}
