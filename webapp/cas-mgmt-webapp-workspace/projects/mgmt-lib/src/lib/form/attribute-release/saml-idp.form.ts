import {AttributeReleaseForm} from './attribute-release.form';
import {FormControl} from '@angular/forms';
import {SamlIdpRegisteredServiceAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form that extends Attrubute Release form and adds allowed saml attributes.
 *
 * @author Travis Schmidt
 */
export class SamlIdpReleaseForm extends AttributeReleaseForm {

  get allowed() { return this.get('allowed') as FormControl; }

  constructor(policy: SamlIdpRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('allowed', new FormControl(policy?.allowedAttributes));
  }

  /**
   * Maps form values to the passed DTO.
   *
   * @param policy - SamlIdpRegisteredServiceAttributeReleasePolicy
   */
  map(policy: SamlIdpRegisteredServiceAttributeReleasePolicy) {
    super.map(policy);
    policy.allowedAttributes = this.allowed.value;
  }
}
