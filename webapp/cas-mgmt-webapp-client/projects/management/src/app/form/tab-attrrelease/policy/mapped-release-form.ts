import {ReturnMappedAttributeReleasePolicy} from 'mgmt-lib';
import {BaseReleaseForm} from './base-release-form';
import {AttributeForm} from '../../attribute-form';

export class MappedReleaseForm extends BaseReleaseForm<ReturnMappedAttributeReleasePolicy> {

  constructor(public policy: ReturnMappedAttributeReleasePolicy) {
    super(policy);
    this.addControl('attributes', new AttributeForm(policy.allowedAttributes));
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
