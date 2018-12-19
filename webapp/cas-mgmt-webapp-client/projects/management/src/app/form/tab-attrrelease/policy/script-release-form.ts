import {BaseReleaseForm} from './base-release-form';
import {ScriptedRegisteredServiceAttributeReleasePolicy, MgmtFormControl} from 'mgmt-lib';

export class ScriptReleaseForm extends BaseReleaseForm<ScriptedRegisteredServiceAttributeReleasePolicy> {

  constructor(public data: ScriptedRegisteredServiceAttributeReleasePolicy) {
    super(data);
    this.addControl('script', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['script'] = this.data.scriptFile;
    return frm;
  }

  mapForm(policy: ScriptedRegisteredServiceAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.scriptFile = this.value.script;
  }
}
