import {AttributeReleaseForm} from '../../attribute-release.form';
import {ReturnMappedAttributeReleasePolicy} from 'domain-lib';
import {AttributesForm} from '../../../attributes/attributes.form';

export class MappedReleaseForm extends AttributeReleaseForm {

  get mapped() { return this.get('mapped') as AttributesForm; }

  constructor(policy: ReturnMappedAttributeReleasePolicy) {
    super(policy);
    this.addControl('mapped', new AttributesForm(policy && policy.allowedAttributes));
  }

  mapForm(policy: ReturnMappedAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.allowedAttributes = this.mapped.mapForm();
  }
}
