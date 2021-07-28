import {FormControl, FormGroup} from '@angular/forms';
import { RegisteredServiceProxyTicketExpirationPolicy, proxyTicketExpirationPolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Proxy Ticket Expiration policies.
 *
 * @author Travis Schmidt
 */
export class ProxyTicketExpForm extends FormGroup {

  get numberOfUses() { return this.get('numberOfUses') as FormControl; }
  get timeToLive() { return this.get('timeToLive') as FormControl; }

  constructor(policy: RegisteredServiceProxyTicketExpirationPolicy) {
    super({
      numberOfUses: new FormControl(policy?.numberOfUses),
      timeToLive: new FormControl(policy?.timeToLive)
    });
  }

  /**
   * Maps the form values to RegisteredServiceProxyTicketExpirationPolicy.
   */
  map(): RegisteredServiceProxyTicketExpirationPolicy {
    if (this.numberOfUses.value || this.timeToLive.value) {
      const policy = proxyTicketExpirationPolicy();
      policy.timeToLive = this.timeToLive.value;
      policy.numberOfUses = this.numberOfUses.value;
      return policy;
    }
    return null;
  }
}
