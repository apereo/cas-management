import {MgmtFormGroup, RegisteredServiceOAuthRefreshTokenExpirationPolicy, MgmtFormControl} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';

export class RefreshTokenExpirationForm extends FormGroup implements MgmtFormGroup<RegisteredServiceOAuthRefreshTokenExpirationPolicy> {

  constructor(public policy: RegisteredServiceOAuthRefreshTokenExpirationPolicy) {
    super({
      timeToKill: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      timeToKill: this.policy.timeToKill
    };
  }

  mapForm(policy: RegisteredServiceOAuthRefreshTokenExpirationPolicy): any {
    const frm = this.value;
    policy.timeToKill = frm.timeToKill;
  }

}
