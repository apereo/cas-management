import {AttributeReleaseForm} from './attribute-release.form';
import {ReturnAllowedAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl} from '@angular/forms';

/**
 * Form that extends AttributeReleaseForm to add Allowed attrbutes.
 *
 * @author Travis Schmidt
 */
export class AllowedReleasedForm extends AttributeReleaseForm {

  get allowed() { return this.get('allowed') as FormControl; }

  constructor(policy: ReturnAllowedAttributeReleasePolicy) {
    super(policy);
    this.addControl('allowed', new FormControl(policy?.allowedAttributes));
  }

  /**
   * Maps form values to the passed DTO.
   *
   * @param policy - ReturnAllowedAttributeReleasePolicy
   */
  map(policy: ReturnAllowedAttributeReleasePolicy) {
    super.map(policy);
    policy.allowedAttributes = this.allowed.value;
  }
}
