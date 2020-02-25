import {FormGroup} from '@angular/forms';
import {SamlRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class EncryptionForm extends FormGroup {

  get encryptAssertions() { return this.get('encryptAssertions') as MgmtFormControl; }
  get encryptAttributes() { return this.get('encryptAttributes') as MgmtFormControl; }
  get encryptionOptional() { return this.get('encryptionOptional') as MgmtFormControl; }
  get encryptableAttributes() { return this.get('encryptableAttributes') as MgmtFormControl; }
  get encryptionDataAlgorithms() { return this.get('encryptionDataAlgorithms') as MgmtFormControl; }
  get encryptionKeyAlgorithms() { return this.get('encryptionKeyAlgorithms') as MgmtFormControl; }
  get encryptionBlackListedAlgorithms() { return this.get('encryptionBlackListedAlgorithms') as MgmtFormControl; }
  get encryptionWhiteListedAlgorithms() { return this.get('encryptionWhiteListedAlgorithms') as MgmtFormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      encryptAssertions: new MgmtFormControl(service?.encryptAssertions),
      encryptAttributes: new MgmtFormControl(service?.encryptAttributes),
      encryptionOptional: new MgmtFormControl(service?.encryptionOptional),
      encryptableAttributes: new MgmtFormControl(service?.encryptableAttributes),
      encryptionDataAlgorithms: new MgmtFormControl(service?.encryptionDataAlgorithms),
      encryptionKeyAlgorithms: new MgmtFormControl(service?.encryptionKeyAlgorithms),
      encryptionBlackListedAlgorithms: new MgmtFormControl(service?.encryptionBlackListedAlgorithms),
      encryptionWhiteListedAlgorithms: new MgmtFormControl(service?.encryptionWhiteListedAlgorithms)
    });
  }

  mapForm(service: SamlRegisteredService) {
    service.encryptAssertions = this.encryptAssertions.value;
    service.encryptAttributes = this.encryptAttributes.value;
    service.encryptionOptional = this.encryptionOptional.value;
    service.encryptableAttributes = this.encryptableAttributes.value;
    service.encryptionDataAlgorithms = this.encryptionDataAlgorithms.value;
    service.encryptionKeyAlgorithms = this.encryptionKeyAlgorithms.value;
    service.encryptionBlackListedAlgorithms = this.encryptionBlackListedAlgorithms.value;
    service.encryptionWhiteListedAlgorithms = this.encryptionWhiteListedAlgorithms.value;
  }
}
