import {BaseReleaseForm} from './base-release-form';
import {LdapSamlRegisteredServiceAttributeReleasePolicy} from 'mgmt-lib';
import {AttributeForm} from '@app/form/attribute-form';

export class SamlLdapReleaseForm extends BaseReleaseForm<LdapSamlRegisteredServiceAttributeReleasePolicy> {

  constructor(public policy: LdapSamlRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('attributes', new AttributeForm(policy.allowedAttributes));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['attributes'] = (<AttributeForm>this.get('attributes')).formMap();
    return frm;
  }

  mapForm(policy: LdapSamlRegisteredServiceAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.allowedAttributes = (<AttributeForm>this.get('attributes')).mapForm();
  }
}
