import {
  AbstractRegisteredService,
  DefaultRegisteredServiceExpirationPolicy,
  RegisteredServiceExpirationPolicy
} from 'domain-lib';
import {FormGroup} from '@angular/forms';
import {MgmtFormGroup} from '../mgmt-form-group';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class ExpirationForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get expirationDate() { return this.get('expirationDate') as MgmtFormControl; }
  get deleteWhenExpired() { return this.get('deleteWhenExpired') as MgmtFormControl; }
  get notifyWhenDeleted() { return this.get('notifyWhenDeleted') as MgmtFormControl; }

  constructor(policy: RegisteredServiceExpirationPolicy) {
    super({
      expirationDate: new MgmtFormControl(policy?.expirationDate),
      deleteWhenExpired: new MgmtFormControl(policy?.deleteWhenExpired),
      notifyWhenDeleted: new MgmtFormControl(policy?.notifyWhenDeleted)
    });
  }

  mapForm(): RegisteredServiceExpirationPolicy {
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
