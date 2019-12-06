import {AttributeReleaseForm} from '../../attribute-release.form';
import {ScriptedRegisteredServiceAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

export class ScriptReleaseForm extends AttributeReleaseForm {

  get script() { return this.get('script') as MgmtFormControl; }

  constructor(policy: ScriptedRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('script', new MgmtFormControl(policy && policy.scriptFile));
  }

  mapForm(policy: ScriptedRegisteredServiceAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.scriptFile = this.script.value;
  }
}
