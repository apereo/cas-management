import {FormControl, FormGroup} from '@angular/forms';
import {ConsentStatus, RegisteredServiceConsentPolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group to display and update fields for Consent.
 *
 * @author Travis Schmidt
 */
export class ConsentForm extends FormGroup {

  get consentEnabled() { return this.get('status') as FormControl; }
  get excluded() { return this.get('excludedAttributes') as FormControl; }
  get includeOnly() { return this.get('includeOnlyAttributes') as FormControl; }

  constructor(policy: RegisteredServiceConsentPolicy) {
    super({
      status: new FormControl(policy?.status),
      excludedAttributes: new FormControl(policy?.excludedAttributes),
      includeOnlyAttributes: new FormControl(policy?.includeOnlyAttributes)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param policy - RegisteredServiceConsentPolicy
   */
  map(policy: RegisteredServiceConsentPolicy) {
    policy.status = this.consentEnabled.value;
    policy.excludedAttributes = this.excluded.value;
    policy.includeOnlyAttributes = this.includeOnly.value;
  }
}
