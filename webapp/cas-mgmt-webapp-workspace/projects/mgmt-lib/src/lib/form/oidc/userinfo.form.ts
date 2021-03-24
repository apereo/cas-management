import {FormControl, FormGroup} from '@angular/forms';
import {OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating options for user info.
 *
 * @author Travis Schmidt
 */
export class UserinfoForm extends FormGroup {

  get userInfoSigningAlg() { return this.get('userInfoSigningAlg') as FormControl; }
  get userInfoEncryptedResponseAlg() { return this.get('userInfoEncryptedResponseAlg') as FormControl; }
  get userInfoEncryptedResponseEncoding() { return this.get('userInfoEncryptedResponseEncoding') as FormControl; }

  constructor(service: OidcRegisteredService) {
    super({
      userInfoSigningAlg: new FormControl(service?.userInfoSigningAlg),
      userInfoEncryptedResponseAlg: new FormControl(service?.userInfoEncryptedResponseAlg),
      userInfoEncryptedResponseEncoding: new FormControl(service?.userInfoEncryptedResponseEncoding)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - OidcRegisteredService
   */
  map(service: OidcRegisteredService) {
   service.userInfoSigningAlg = this.userInfoSigningAlg.value;
   service.userInfoEncryptedResponseAlg = this.userInfoEncryptedResponseAlg.value;
   service.userInfoEncryptedResponseEncoding = this.userInfoEncryptedResponseEncoding.value;
  }
}
