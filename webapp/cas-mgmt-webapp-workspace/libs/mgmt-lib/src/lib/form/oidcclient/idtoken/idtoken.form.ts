import {FormGroup} from '@angular/forms';
import {OidcRegisteredService} from 'domain-lib';
import {OptionsForm} from './options/options.form';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class IdTokenForm extends FormGroup {

  get idTokenEncryptionAlg() { return this.get('idTokenEncryptionAlg') as MgmtFormControl; }
  get idTokenEncryptionEncoding() { return this.get('idTokenEncryptionEncoding') as MgmtFormControl; }
  get idTokenSigningAlg() { return this.get('idTokenSigningAlg') as MgmtFormControl; }
  get idTokenOptions() { return this.get('idTokenOptions') as OptionsForm; }

  constructor(service: OidcRegisteredService) {
    super({
      idTokenEncryptionAlg: new MgmtFormControl(service?.idTokenEncryptionAlg),
      idTokenEncryptionEncoding: new MgmtFormControl(service?.idTokenEncryptionEncoding),
      idTokenSigningAlg: new MgmtFormControl(service?.idTokenSigningAlg),
      idTokenOptions: new OptionsForm(service)
    });
  }

  mapForm(service: OidcRegisteredService) {
    service.idTokenSigningAlg = this.idTokenSigningAlg.value;
    service.idTokenEncryptionEncoding = this.idTokenEncryptionEncoding.value;
    service.idTokenEncryptionAlg = this.idTokenEncryptionAlg.value;
    this.idTokenOptions.mapForm(service);
  }
}
