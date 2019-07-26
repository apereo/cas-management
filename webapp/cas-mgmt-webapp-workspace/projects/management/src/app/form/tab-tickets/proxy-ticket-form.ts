import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';
import {RegisteredServiceProxyTicketExpirationPolicy} from 'domain-lib';

export class ProxyTicketForm extends FormGroup implements MgmtFormGroup<RegisteredServiceProxyTicketExpirationPolicy> {

  constructor(public policy: RegisteredServiceProxyTicketExpirationPolicy) {
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

  mapForm(policy: RegisteredServiceProxyTicketExpirationPolicy): any {
    const frm = this.value;
    policy.numberOfUses = frm.numberOfUses;
    policy.timeToLive = frm.timeToLive;
  }

}
