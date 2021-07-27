import {FormControl, FormGroup} from '@angular/forms';
import { RegisteredServiceOAuthRefreshTokenExpirationPolicy, refreshTokenExpirationPolicy } from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Refresh Token Expiration policy.
 *
 * @author Travis Schmidt
 */
export class RefreshTokenExpirationForm extends FormGroup {

  get timeToKill() { return this.get('timeToKill') as FormControl; }

  constructor(policy: RegisteredServiceOAuthRefreshTokenExpirationPolicy) {
    super({
      timeToKill: new FormControl(policy?.timeToKill)
    });
  }

  /**
   * Maps the form values to RegisteredServiceOAuthRefreshTokenExpirationPolicy.
   */
  map(): RegisteredServiceOAuthRefreshTokenExpirationPolicy {
    if (this.timeToKill.value) {
      const policy = refreshTokenExpirationPolicy();
      policy.timeToKill = this.timeToKill.value;
      return policy;
    }
    return null;
  }
}
