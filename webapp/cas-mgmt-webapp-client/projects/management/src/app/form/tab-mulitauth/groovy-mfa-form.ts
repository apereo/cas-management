import {BaseMfaForm} from './base-mfa-form';
import {GroovyRegisteredServiceMultifactorPolicy, MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class GroovyMfaForm extends BaseMfaForm<GroovyRegisteredServiceMultifactorPolicy> {

  constructor(public data: GroovyRegisteredServiceMultifactorPolicy) {
    super(data);
    this.addControl('groovy', new MgmtFormControl(null, null, Validators.required));
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
