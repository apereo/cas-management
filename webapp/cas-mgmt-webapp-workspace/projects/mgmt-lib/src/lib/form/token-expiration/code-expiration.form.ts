import {FormControl, FormGroup} from '@angular/forms';
import {RegisteredServiceOAuthCodeExpirationPolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Access Code Expiration policy.
 *
 * @author Travis Schmidt
 */
export class CodeExpirationForm extends FormGroup {

  get numberOfUses() {return this.get('numberOfUses') as FormControl; }
  get timeToLive() { return this.get('timeToLive') as FormControl; }

  constructor(policy: RegisteredServiceOAuthCodeExpirationPolicy) {
    super({
      numberOfUses: new FormControl(policy?.numberOfUses),
      timeToLive: new FormControl(policy?.timeToLive)
    });
  }

  /**
   * Maps the form values to RegisteredServiceOAuthCodeExpirationPolicy.
   */
  map(): RegisteredServiceOAuthCodeExpirationPolicy {
    if (this.numberOfUses.value) {
      const policy = new RegisteredServiceOAuthCodeExpirationPolicy();
      policy.numberOfUses = this.numberOfUses.value;
      policy.timeToLive = this.timeToLive.value;
      return policy;
    }
    return null;
  }
}
