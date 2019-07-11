import {MgmtFormGroup, RegisteredServiceOAuthCodeExpirationPolicy, MgmtFormControl} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';

export class CodeExpirationForm extends FormGroup implements MgmtFormGroup<RegisteredServiceOAuthCodeExpirationPolicy> {

  constructor(public policy: RegisteredServiceOAuthCodeExpirationPolicy) {
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

  mapForm(policy: RegisteredServiceOAuthCodeExpirationPolicy): any {
    const frm = this.value;
    policy.numberOfUses = frm.numberOfUses;
    policy.timeToLive = frm.timeToLive;
  }

}
