import {AttributeReleaseForm} from './attribute-release.form';
import {FormControl} from '@angular/forms';
import {MetadataEntityAttributesAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form that extends Attribute Release form and adds metadata attributes.
 *
 * @author Travis Schmidt
 */
export class MetadataReleaseForm extends AttributeReleaseForm {

  get entityAttribute() { return this.get('entityAttribute') as FormControl; }
  get entityAttributeFormat() { return this.get('entityAttributeFormat') as FormControl; }
  get entityAttributeValues() { return this.get('entityAttributeValues') as FormControl; }

  constructor(policy: MetadataEntityAttributesAttributeReleasePolicy) {
    super(policy);
    this.addControl('entityAttribute', new FormControl(policy?.entityAttribute));
    this.addControl('entityAttributeFormat', new FormControl(policy?.entityAttributeFormat));
    this.addControl('entityAttributeValues', new FormControl(policy?.entityAttributeValues));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param policy - MetadataEntityAttributesAttributeReleasePolicy
   */
  map(policy: MetadataEntityAttributesAttributeReleasePolicy) {
    super.map(policy);
    policy.entityAttributeValues = this.entityAttributeValues.value;
    policy.entityAttributeFormat = this.entityAttributeFormat.value;
    policy.entityAttribute = this.entityAttribute.value;
  }
}
