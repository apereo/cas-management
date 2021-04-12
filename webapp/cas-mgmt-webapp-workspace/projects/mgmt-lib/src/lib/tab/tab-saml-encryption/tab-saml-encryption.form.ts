import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, EncryptionForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating saml encryption options for a service.
 *
 * @author Travis Schmidt
 */
export class TabSamlEncryptionForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get encryption() { return this.get('encryption') as EncryptionForm; }
  set encryption(c: EncryptionForm) { this.setControl('encryption', c); }

  constructor(private service: SamlRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.encryption = new EncryptionForm(this.service);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    this.encryption.map(service as SamlRegisteredService);
  }

}
