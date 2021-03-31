import {FormGroup} from '@angular/forms';
import { serviceTicketExpirationPolicy, RegisteredServiceServiceTicketExpirationPolicy, DefaultRegisteredServiceServiceTicketExpirationPolicy } from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class ServiceTicketExpForm extends FormGroup {

  get numberOfUses() { return this.get('numberOfUses') as MgmtFormControl; }
  get timeToLive() { return this.get('timeToLive') as MgmtFormControl; }

  constructor(policy: RegisteredServiceServiceTicketExpirationPolicy) {
    super({
      numberOfUses: new MgmtFormControl(policy?.numberOfUses),
      timeToLive: new MgmtFormControl(policy?.timeToLive)
    });
  }

  mapForm(): RegisteredServiceServiceTicketExpirationPolicy {
    if (this.numberOfUses.value || this.timeToLive.value) {
      const policy = serviceTicketExpirationPolicy({
        timeToLive: this.timeToLive.value,
        numberOfUses: this.numberOfUses.value,
        '@class': DefaultRegisteredServiceServiceTicketExpirationPolicy.cName
      });
      return policy;
    }
    return null;
  }
}
