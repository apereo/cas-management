import {AttributeReleaseForm} from '../../attribute-release.form';
import {GroovyScriptAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

export class GroovyReleaseForm extends AttributeReleaseForm {

  get script() { return this.get('script') as MgmtFormControl; }

  constructor(policy: GroovyScriptAttributeReleasePolicy) {
    super(policy);
    this.addControl('script', new MgmtFormControl(policy && policy.groovyScript));
  }

  mapForm(policy: GroovyScriptAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.groovyScript = this.script.value;
  }
}
