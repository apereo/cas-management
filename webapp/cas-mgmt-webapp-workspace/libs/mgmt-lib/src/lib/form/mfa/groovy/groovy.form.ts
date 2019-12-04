import {GroovyRegisteredServiceMultifactorPolicy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {MfaForm} from '../mfa.form';

export class GroovyMfaForm extends MfaForm {

  get script() { return this.get('script') as MgmtFormControl; }

  constructor(policy: GroovyRegisteredServiceMultifactorPolicy) {
    super({
      script: new MgmtFormControl(policy && policy.groovyScript)
    });
  }

  mapForm(policy: GroovyRegisteredServiceMultifactorPolicy) {
    policy.groovyScript = this.script.value;
  }
}
