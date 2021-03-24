import {GroovyRegisteredServiceMultifactorPolicy} from '@apereo/mgmt-lib/src/lib/model';
import {MfaForm} from './mfa.form';
import {FormControl} from '@angular/forms';

/**
 * Form group for displaying and updating Groovy MFA form.
 *
 * @author Travis Schmidt
 */
export class GroovyMfaForm extends MfaForm {

  get script() { return this.get('script') as FormControl; }

  constructor(policy: GroovyRegisteredServiceMultifactorPolicy) {
    super({
      script: new FormControl(policy?.groovyScript)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param policy - GroovyRegisteredServiceMultifactorPolicy
   */
  map(policy: GroovyRegisteredServiceMultifactorPolicy) {
    policy.groovyScript = this.script.value;
  }
}
