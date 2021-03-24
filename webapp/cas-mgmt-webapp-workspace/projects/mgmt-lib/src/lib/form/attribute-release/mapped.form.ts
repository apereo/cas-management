import {AttributeReleaseForm} from './attribute-release.form';
import {AttributesForm} from '../attributes.form';
import {ReturnMappedAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form that extends Attrubute Release form and adds mapped attributes.
 *
 * @author Travis Schmidt
 */
export class MappedReleaseForm extends AttributeReleaseForm {

  get mapped() { return this.get('mapped') as AttributesForm; }

  constructor(policy: ReturnMappedAttributeReleasePolicy) {
    super(policy);
    this.addControl('mapped', new AttributesForm(policy?.allowedAttributes));
  }

  /**
   * Maps form values to the passed DTO.
   *
   * @param policy - ReturnMappedAttributeReleasePolicy
   */
  map(policy: ReturnMappedAttributeReleasePolicy) {
    super.map(policy);
    policy.allowedAttributes = this.mapped.map();
  }
}
