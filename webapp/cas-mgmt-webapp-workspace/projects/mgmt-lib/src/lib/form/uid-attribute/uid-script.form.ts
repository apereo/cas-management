import {UidattrsForm} from './uidattrs.form';
import {ScriptedRegisteredServiceUsernameProvider} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl, Validators} from '@angular/forms';

/**
 * Form group for displaying and updating Script uid attribute.
 *
 * @author Travis Schmidt
 */
export class ScriptUidForm extends UidattrsForm {

  get script() { return this.get('script') as FormControl; }

  constructor(provider: ScriptedRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('script', new FormControl(provider?.script, Validators.required));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param provider - ScriptedRegisteredServiceUsernameProvider
   */
  map(provider: ScriptedRegisteredServiceUsernameProvider) {
    super.map(provider);
    provider.script = this.script.value;
  }
}
