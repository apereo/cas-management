import {AttributeReleaseForm} from '../../attribute-release.form';
import {GroovySamlRegisteredServiceAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

export class GroovySamlReleaseForm extends AttributeReleaseForm {

  get script() { return this.get('script') as MgmtFormControl; }

  constructor(policy: GroovySamlRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('script', new MgmtFormControl(policy?.groovyScript));
  }

  mapForm(policy: GroovySamlRegisteredServiceAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.groovyScript = this.script.value;
  }
}
