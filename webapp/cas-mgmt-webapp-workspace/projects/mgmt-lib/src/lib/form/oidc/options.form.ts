import {FormControl, FormGroup} from '@angular/forms';
import {OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating options for Id Tokens.
 *
 * @author Travis Schmdit
 */
export class OptionsForm extends FormGroup {

  get signIdToken() { return this.get('signIdToken') as FormControl; }
  get encryptIdToken() { return this.get('encryptIdToken') as FormControl; }

  constructor(private service: OidcRegisteredService) {
    super({
      signIdToken: new FormControl(service?.signIdToken),
      encryptIdToken: new FormControl(service?.encryptIdToken),
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - OidcRegisteredService
   */
  map(service: OidcRegisteredService) {
    service.signIdToken = this.signIdToken.value;
    service.encryptIdToken = this.encryptIdToken.value;
  }
}
