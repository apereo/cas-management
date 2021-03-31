import {FormGroup} from '@angular/forms';
import {
  proxyTicketExpirationPolicy,
  RegisteredServiceProxyTicketExpirationPolicy,
  DefaultRegisteredServiceProxyTicketExpirationPolicy
} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class ProxyTicketExpForm extends FormGroup {

  get numberOfUses() { return this.get('numberOfUses') as MgmtFormControl; }
  get timeToLive() { return this.get('timeToLive') as MgmtFormControl; }

  constructor(policy: RegisteredServiceProxyTicketExpirationPolicy) {
    super({
      numberOfUses: new MgmtFormControl(policy?.numberOfUses),
      timeToLive: new MgmtFormControl(policy?.timeToLive)
    });
  }

  mapForm(): RegisteredServiceProxyTicketExpirationPolicy {
    if (this.numberOfUses.value || this.timeToLive.value) {
      const policy = proxyTicketExpirationPolicy({
        timeToLive: this.timeToLive.value,
        numberOfUses: this.numberOfUses.value,
        '@class': DefaultRegisteredServiceProxyTicketExpirationPolicy.cName
      });
      return policy;
    }
    return null;
  }
}
