import {FormControl, FormGroup} from '@angular/forms';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating SAML encryption options.
 *
 * @author Travis Schmidt
 */
export class EncryptionForm extends FormGroup {

  get encryptAssertions() { return this.get('encryptAssertions') as FormControl; }
  get encryptAttributes() { return this.get('encryptAttributes') as FormControl; }
  get encryptionOptional() { return this.get('encryptionOptional') as FormControl; }
  get encryptableAttributes() { return this.get('encryptableAttributes') as FormControl; }
  get encryptionDataAlgorithms() { return this.get('encryptionDataAlgorithms') as FormControl; }
  get encryptionKeyAlgorithms() { return this.get('encryptionKeyAlgorithms') as FormControl; }
  get encryptionBlackListedAlgorithms() { return this.get('encryptionBlackListedAlgorithms') as FormControl; }
  get encryptionWhiteListedAlgorithms() { return this.get('encryptionWhiteListedAlgorithms') as FormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      encryptAssertions: new FormControl(service?.encryptAssertions),
      encryptAttributes: new FormControl(service?.encryptAttributes),
      encryptionOptional: new FormControl(service?.encryptionOptional),
      encryptableAttributes: new FormControl(service?.encryptableAttributes),
      encryptionDataAlgorithms: new FormControl(service?.encryptionDataAlgorithms),
      encryptionKeyAlgorithms: new FormControl(service?.encryptionKeyAlgorithms),
      encryptionBlackListedAlgorithms: new FormControl(service?.encryptionBlackListedAlgorithms),
      encryptionWhiteListedAlgorithms: new FormControl(service?.encryptionWhiteListedAlgorithms)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - SamlRegisteredService
   */
  map(service: SamlRegisteredService) {
    service.encryptAssertions = this.encryptAssertions.value;
    service.encryptAttributes = this.encryptAttributes.value;
    service.encryptionOptional = this.encryptionOptional.value;
    service.encryptableAttributes = this.encryptableAttributes.value|| [];
    service.encryptionDataAlgorithms = this.encryptionDataAlgorithms.value|| [];
    service.encryptionKeyAlgorithms = this.encryptionKeyAlgorithms.value|| [];
    service.encryptionBlackListedAlgorithms = this.encryptionBlackListedAlgorithms.value || [];
    service.encryptionWhiteListedAlgorithms = this.encryptionWhiteListedAlgorithms.value || [];
  }
}
