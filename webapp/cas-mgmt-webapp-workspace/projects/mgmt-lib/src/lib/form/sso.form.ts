import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  ChainingRegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType
} from '@apereo/mgmt-lib/src/lib/model';
import {ChainingSsoForm, createSsoForm, SsoPolicyForm} from './sso-policy.form';

/**
 * Form group for displaying and updating sso policies.
 *
 * @author Travis Schmidt
 */
export class SsoForm extends FormGroup {

  get ssoEnabled() { return this.get('ssoEnabled') as FormControl; }
  get policyForm() { return this.get('policy') as FormControl; }
  get policy() { return this.get('policy').value as SsoPolicyForm; }

  constructor(service: AbstractRegisteredService) {
    super({
      ssoEnabled: new FormControl(service?.accessStrategy?.ssoEnabled),
      policy: new FormControl(null)
    });
    const p = createSsoForm(service?.singleSignOnParticipationPolicy);
    if (p.type === SsoPolicyType.CHAINING) {
      this.policyForm.setValue(p);
    } else {
      const c = new ChainingSsoForm(new ChainingRegisteredServiceSingleSignOnParticipationPolicy());
      c.policies.push(p);
      this.policyForm.setValue(c);
    }
  }

  /**
   * Maps the from values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    service.accessStrategy.ssoEnabled = this.ssoEnabled.value;
    service.singleSignOnParticipationPolicy = this.policy.map();
  }

}
