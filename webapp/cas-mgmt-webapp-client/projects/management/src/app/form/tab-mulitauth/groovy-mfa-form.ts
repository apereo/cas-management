import {BaseMfaForm} from './base-mfa-form';
import {GroovyRegisteredServiceMultifactorPolicy, MgmtFormControl} from 'mgmt-lib';

export class GroovyMfaForm extends BaseMfaForm<GroovyRegisteredServiceMultifactorPolicy> {

  constructor(public data: GroovyRegisteredServiceMultifactorPolicy) {
    super(data);
    this.addControl('groovy', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      groovy: this.data.groovyScript
    }
  }

  mapForm(policy: GroovyRegisteredServiceMultifactorPolicy) {
    policy.groovyScript = this.value.groovy;
  }
}
