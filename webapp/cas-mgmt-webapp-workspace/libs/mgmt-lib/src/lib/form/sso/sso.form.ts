import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  ChainingRegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType
} from 'domain-lib';
import {ChainingSsoForm, createSsoForm, SsoPolicyForm} from './policy/sso-policy.form';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class SsoForm extends FormGroup {

  get ssoEnabled() { return this.get('ssoEnabled') as MgmtFormControl; }
  get policyForm() { return this.get('policy') as FormControl; }
  get policy() { return this.get('policy').value as SsoPolicyForm; }

  constructor(service: AbstractRegisteredService) {
    super({
      ssoEnabled: new MgmtFormControl(service && service.accessStrategy && service.accessStrategy.ssoEnabled),
      policy: new FormControl(null)
    });
    const p = createSsoForm(service && service.singleSignOnParticipationPolicy);
    if (p.type === SsoPolicyType.CHAINING) {
      this.policyForm.setValue(p);
    } else {
      const c = new ChainingSsoForm(new ChainingRegisteredServiceSingleSignOnParticipationPolicy());
      c.policies.push(p);
      this.policyForm.setValue(c);
    }
  }

  mapForm(service: AbstractRegisteredService) {
    service.accessStrategy.ssoEnabled = this.ssoEnabled.value;
    service.singleSignOnParticipationPolicy = this.policy.mapForm();
  }

}
