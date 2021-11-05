import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  ChainingRegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType
} from '@apereo/mgmt-lib/src/lib/model';
import { takeUntil } from 'rxjs/operators';
import {ChainingSsoForm, createSsoForm, SsoPolicyForm} from './sso-policy.form';

/**
 * Form group for displaying and updating sso policies.
 *
 * @author Travis Schmidt
 */
export class SsoForm extends FormGroup {

  get ssoEnabled() { return this.get('ssoEnabled') as FormControl; }
  get policyForm() { return this.get('policy') as ChainingSsoForm; }
  get policy() { return this.get('policy').value as SsoPolicyForm; }

  constructor(service: AbstractRegisteredService) {
    super({
      ssoEnabled: new FormControl(service?.accessStrategy?.ssoEnabled),
      policy: new ChainingSsoForm(ChainingRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(service?.singleSignOnParticipationPolicy) ? 
        new ChainingRegisteredServiceSingleSignOnParticipationPolicy(service?.singleSignOnParticipationPolicy) :
        new ChainingRegisteredServiceSingleSignOnParticipationPolicy()
      )
    });

    if (!ChainingRegisteredServiceSingleSignOnParticipationPolicy.instanceOf(service?.singleSignOnParticipationPolicy)) {
      this.policyForm.policies.push(createSsoForm(service?.singleSignOnParticipationPolicy))
    }
  }

  /**
   * Maps the from values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    service.accessStrategy.ssoEnabled = this.ssoEnabled.value;
    service.singleSignOnParticipationPolicy = this.policyForm.map();
  }

}
