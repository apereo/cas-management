import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';
import {RegisteredServiceServiceTicketExpirationPolicy} from 'domain-lib';

export class ServiceTicketForm extends FormGroup implements MgmtFormGroup<RegisteredServiceServiceTicketExpirationPolicy> {

  constructor(public policy: RegisteredServiceServiceTicketExpirationPolicy) {
    super({
      numberOfUses: new MgmtFormControl(null),
      timeToLive: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      numberOfUses: this.policy.numberOfUses,
      timeToLive: this.policy.timeToLive
    };
  }

  mapForm(policy: RegisteredServiceServiceTicketExpirationPolicy): any {
    const frm = this.value;
    policy.numberOfUses = frm.numberOfUses;
    policy.timeToLive = frm.timeToLive;
  }

}
