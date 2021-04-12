import {FormControl, FormGroup} from '@angular/forms';
import {DefaultRegisteredServiceUsernameProvider} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating UID Attribute policies.
 *
 * @author Travis Schmidt
 */
export class UidattrsForm extends FormGroup {

  get encryptUsername() { return this.get('encryptUsername') as FormControl; }
  get canonicalizationMode() { return this.get('canonicalizationMode') as FormControl; }

  constructor(provider: DefaultRegisteredServiceUsernameProvider) {
    super({
      encryptUsername: new FormControl(provider?.encryptUsername),
      canonicalizationMode: new FormControl(provider?.canonicalizationMode)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param provider - DefaultRegisteredServiceUsernameProvider
   */
  map(provider: DefaultRegisteredServiceUsernameProvider) {
    provider.encryptUsername = this.encryptUsername.value;
    provider.canonicalizationMode = this.canonicalizationMode.value;
  }
}
