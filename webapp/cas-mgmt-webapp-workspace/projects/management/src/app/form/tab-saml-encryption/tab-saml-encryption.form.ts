import {FormGroup} from '@angular/forms';
import {EncryptionForm, MgmtFormGroup} from 'mgmt-lib';
import {AbstractRegisteredService, SamlRegisteredService} from 'domain-lib';

export class TabSamlEncryptionForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get encryption() { return this.get('encryption') as EncryptionForm; }

  constructor(service: SamlRegisteredService) {
    super({
      encryption: new EncryptionForm(service),
    });
  }

  mapForm(service: AbstractRegisteredService) {
    this.encryption.mapForm(service as SamlRegisteredService);
  }

}
