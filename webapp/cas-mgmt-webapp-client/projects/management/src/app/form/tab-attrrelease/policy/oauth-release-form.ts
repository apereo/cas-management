import {BaseReleaseForm} from './base-release-form';
import {AttributeForm} from '@app/form/attribute-form';
import {OAuthAttributeReleasePolicy} from 'mgmt-lib';

export class OAuthReleaseForm extends BaseReleaseForm<OAuthAttributeReleasePolicy> {

  constructor(public policy: OAuthAttributeReleasePolicy) {
    super(policy);
    this.addControl('attributes', new AttributeForm(policy.allowedAttributes));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['attributes'] = (<AttributeForm>this.get('attributes')).formMap();
    return frm;
  }

  mapForm(policy: OAuthAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.allowedAttributes = (<AttributeForm>this.get('attributes')).mapForm();
  }
}
