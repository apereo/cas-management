import {ReturnMappedAttributeReleasePolicy} from 'mgmt-lib';
import {BaseReleaseForm} from './base-release-form';
import {AttributeForm} from '../../attribute-form';

export class MappedReleaseForm extends BaseReleaseForm<ReturnMappedAttributeReleasePolicy> {

  constructor(public data: ReturnMappedAttributeReleasePolicy) {
    super(data);
    this.addControl('attributes', new AttributeForm(data.allowedAttributes));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['attributes'] = (<AttributeForm>this.get('attributes')).formMap();
    return frm;
  }

  mapForm(policy: ReturnMappedAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.allowedAttributes = (<AttributeForm>this.get('attributes')).mapForm();
  }
}
