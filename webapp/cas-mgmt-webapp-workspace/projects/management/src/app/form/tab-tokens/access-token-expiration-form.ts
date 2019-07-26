import {FormGroup} from '@angular/forms';
import {RegisteredServiceOAuthAccessTokenExpirationPolicy} from 'domain-lib';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';

export class AccessTokenExpirationForm extends FormGroup implements MgmtFormGroup<RegisteredServiceOAuthAccessTokenExpirationPolicy> {

  constructor(public policy: RegisteredServiceOAuthAccessTokenExpirationPolicy) {
    super({
      maxTimeToLive: new MgmtFormControl(null),
      timeToKill: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      maxTimeToLive: this.policy.maxTimeToLive,
      timeToKill: this.policy.timeToKill
    };
  }

  mapForm(policy: RegisteredServiceOAuthAccessTokenExpirationPolicy): any {
    const frm = this.value;
    policy.maxTimeToLive = frm.maxTimeToLive;
    policy.timeToKill = frm.timeToKill;
  }

}
