import {FormGroup} from '@angular/forms';
import {RegisteredServiceDelegatedAuthenticationPolicy} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class DelegatedForm extends FormGroup {

  get allowedProviders() { return this.get('allowedProviders') as MgmtFormControl; }
  get permitUndefined() { return this.get('permitUndefined') as MgmtFormControl; }
  get exclusive() { return this.get('exclusive') as MgmtFormControl; }

  constructor(policy: RegisteredServiceDelegatedAuthenticationPolicy) {
    super({
      allowedProviders: new MgmtFormControl(policy && policy.allowedProviders),
      permitUndefined: new MgmtFormControl(policy && policy.permitUndefined),
      exclusive: new MgmtFormControl(policy && policy.exclusive)
    });
  }

  mapForm(policy: RegisteredServiceDelegatedAuthenticationPolicy) {
    policy.allowedProviders = this.allowedProviders.value;
    policy.permitUndefined = this.permitUndefined.value;
    policy.exclusive = this.exclusive.value;
  }

}
