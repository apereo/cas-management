import {FormControl, FormGroup} from '@angular/forms';
import {RegisteredServiceOAuthAccessTokenExpirationPolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Access Token Expiration policy.
 *
 * @author Travis Schmidt
 */
export class AccessTokenExpirationForm extends FormGroup {

  get maxTimeToLive() { return this.get('maxTimeToLive') as FormControl; }
  get timeToKill() { return this.get('timeToKill') as FormControl; }

  constructor(policy: RegisteredServiceOAuthAccessTokenExpirationPolicy) {
    super({
      maxTimeToLive: new FormControl(policy?.maxTimeToLive),
      timeToKill: new FormControl(policy?.timeToKill)
    });
  }

  /**
   * Maps the form values to a RegisteredServiceOAuthAccessTokenExpirationPolicy.
   */
  map(): RegisteredServiceOAuthAccessTokenExpirationPolicy {
    if (this.maxTimeToLive.value) {
      const policy = new RegisteredServiceOAuthAccessTokenExpirationPolicy();
      policy.timeToKill = this.timeToKill.value;
      policy.maxTimeToLive = this.maxTimeToLive.value;
      return policy;
    }
    return null;
  }
}
