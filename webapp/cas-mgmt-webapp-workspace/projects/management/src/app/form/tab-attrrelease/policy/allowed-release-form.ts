import {ReturnAllowedAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from 'mgmt-lib';
import {BaseReleaseForm} from './base-release-form';

export class AllowedReleaseForm extends BaseReleaseForm<ReturnAllowedAttributeReleasePolicy> {

  constructor(public policy: ReturnAllowedAttributeReleasePolicy) {
    super(policy);
    this.addControl('allowed', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['allowed'] = this.policy.allowedAttributes;
    return frm;
  }

  mapForm(policy: ReturnAllowedAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.allowedAttributes = this.value.allowed;
  }
}
