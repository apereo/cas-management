import {BaseReleaseForm} from './base-release-form';
import {Validators} from '@angular/forms';
import {ReturnRestfulAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from 'mgmt-lib';

export class RestfulReleaseForm extends BaseReleaseForm<ReturnRestfulAttributeReleasePolicy> {

  constructor(public policy: ReturnRestfulAttributeReleasePolicy) {
    super(policy);
    this.addControl('restful',  new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['restful'] = this.policy.endpoint;
    return frm;
  }

  mapForm(policy: ReturnRestfulAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.endpoint = this.value.endpoint;
  }
}
