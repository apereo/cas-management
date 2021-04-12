import {
  AbstractRegisteredService,
  DefaultRegisteredServiceExpirationPolicy,
  RegisteredServiceExpirationPolicy
} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl, FormGroup} from '@angular/forms';
import {MgmtFormGroup} from './mgmt-form-group';

/**
 * Form group to display and update Expiration Policy.
 *
 * @author Travis Schmidt
 */
export class ExpirationForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get expirationDate() { return this.get('expirationDate') as FormControl; }
  get deleteWhenExpired() { return this.get('deleteWhenExpired') as FormControl; }
  get notifyWhenDeleted() { return this.get('notifyWhenDeleted') as FormControl; }

  constructor(policy: RegisteredServiceExpirationPolicy) {
    super({
      expirationDate: new FormControl(policy?.expirationDate),
      deleteWhenExpired: new FormControl(policy?.deleteWhenExpired),
      notifyWhenDeleted: new FormControl(policy?.notifyWhenDeleted)
    });
  }

  /**
   * Maps the form values to a RegisteredServiceExpirationPolicy.
   */
  map(): RegisteredServiceExpirationPolicy {
    if (this.expirationDate.value) {
      const policy = new DefaultRegisteredServiceExpirationPolicy();
      policy.expirationDate = this.expirationDate.value;
      policy.deleteWhenExpired = this.deleteWhenExpired.value;
      policy.notifyWhenDeleted = this.notifyWhenDeleted.value;
      return policy;
    }
    return null;
  }
}
