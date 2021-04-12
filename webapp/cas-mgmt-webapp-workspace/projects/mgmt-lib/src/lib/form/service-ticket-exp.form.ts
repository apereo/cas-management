import {FormControl, FormGroup} from '@angular/forms';
import {RegisteredServiceServiceTicketExpirationPolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Service Ticket Expiration policy.
 *
 * @author Travis Schmidt
 */
export class ServiceTicketExpForm extends FormGroup {

  get numberOfUses() { return this.get('numberOfUses') as FormControl; }
  get timeToLive() { return this.get('timeToLive') as FormControl; }

  constructor(policy: RegisteredServiceServiceTicketExpirationPolicy) {
    super({
      numberOfUses: new FormControl(policy?.numberOfUses),
      timeToLive: new FormControl(policy?.timeToLive)
    });
  }

  /**
   * Maps the form values to RegisteredServiceServiceTicketExpirationPolicy.
   */
  map(): RegisteredServiceServiceTicketExpirationPolicy {
    if (this.numberOfUses.value || this.timeToLive.value) {
      const policy = new RegisteredServiceServiceTicketExpirationPolicy();
      policy.timeToLive = this.timeToLive.value;
      policy.numberOfUses = this.numberOfUses.value;
      return policy;
    }
    return null;
  }
}
