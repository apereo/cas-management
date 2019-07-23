import {BaseReleaseForm} from './base-release-form';
import {ScriptedRegisteredServiceAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class ScriptReleaseForm extends BaseReleaseForm<ScriptedRegisteredServiceAttributeReleasePolicy> {

  constructor(public policy: ScriptedRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('script', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['script'] = this.policy.scriptFile;
    return frm;
  }

  mapForm(policy: ScriptedRegisteredServiceAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.scriptFile = this.value.script;
  }
}
