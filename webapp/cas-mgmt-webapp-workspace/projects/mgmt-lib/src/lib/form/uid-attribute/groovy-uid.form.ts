import {UidattrsForm} from './uidattrs.form';
import {GroovyRegisteredServiceUsernameProvider} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl, Validators} from '@angular/forms';

/**
 * Form group for displaying and updating Groovy uid attributes.
 *
 * @author Travis Schmidt
 */
export class GroovyUidForm extends UidattrsForm {

  get groovy() { return this.get('groovyScript') as FormControl; }

  constructor(provider: GroovyRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('groovyScript', new FormControl(provider?.groovyScript, Validators.required));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param provider - GroovyRegisteredServiceUsernameProvider
   */
  map(provider: GroovyRegisteredServiceUsernameProvider) {
    super.map(provider);
    provider.groovyScript = this.groovy.value;
  }
}
