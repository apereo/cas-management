import {FormControl, FormGroup} from '@angular/forms';
import {OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {OptionsForm} from './options.form';

/**
 * Form group for displaying and updating allowed Id Token algorithms.
 *
 * @author Travis Schmidt
 */
export class IdTokenForm extends FormGroup {

  get idTokenEncryptionAlg() { return this.get('idTokenEncryptionAlg') as FormControl; }
  get idTokenEncryptionEncoding() { return this.get('idTokenEncryptionEncoding') as FormControl; }
  get idTokenSigningAlg() { return this.get('idTokenSigningAlg') as FormControl; }
  get idTokenOptions() { return this.get('idTokenOptions') as OptionsForm; }

  constructor(service: OidcRegisteredService) {
    super({
      idTokenEncryptionAlg: new FormControl(service?.idTokenEncryptionAlg),
      idTokenEncryptionEncoding: new FormControl(service?.idTokenEncryptionEncoding),
      idTokenSigningAlg: new FormControl(service?.idTokenSigningAlg),
      idTokenOptions: new OptionsForm(service)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - OidcRegisteredService
   */
  map(service: OidcRegisteredService) {
    service.idTokenSigningAlg = this.idTokenSigningAlg.value;
    service.idTokenEncryptionEncoding = this.idTokenEncryptionEncoding.value;
    service.idTokenEncryptionAlg = this.idTokenEncryptionAlg.value;
    this.idTokenOptions.map(service);
  }
}
