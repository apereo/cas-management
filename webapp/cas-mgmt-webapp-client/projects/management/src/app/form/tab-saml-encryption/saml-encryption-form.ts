import {FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  MgmtFormGroup,
  SamlRegisteredService,
  MgmtFormControl
} from 'mgmt-lib';

export class SamlEncryptionForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: SamlRegisteredService) {
    super({
      encryptAssertions: new MgmtFormControl(null),
      encryptAttributes: new MgmtFormControl(null),
      encryptionOptional: new MgmtFormControl(null),
      encryptableAttributes: new MgmtFormControl(null),
      encryptionDataAlgorithms: new MgmtFormControl(null),
      encryptionKeyAlgorithms: new MgmtFormControl(null),
      encryptionBlackListedAlgorithms: new MgmtFormControl(null),
      encryptionWhiteListedAlgorithms: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      encryptAssertions: this.service.encryptAssertions,
      encryptAttributes: this.service.encryptAttributes,
      encryptionOptional: this.service.encryptionOptional,
      encryptableAttributes: this.service.encryptableAttributes,
      encryptionDataAlgorithms: this.service.encryptionDataAlgorithms,
      encryptionKeyAlgorithms: this.service.encryptionKeyAlgorithms,
      encryptionBlackListedAlgorithms: this.service.encryptionBlackListedAlgorithms,
      encryptionWhiteListedAlgorithms: this.service.encryptionWhiteListedAlgorithms
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const saml: SamlRegisteredService = service as SamlRegisteredService;
    const frm = this.value;
    saml.encryptAssertions = frm.encryptAssertions;
    saml.encryptableAttributes = frm.encryptAttributes;
    saml.encryptionOptional = frm.encryptionOptional;
    saml.encryptableAttributes = frm.encryptableAttributes;
    saml.encryptionDataAlgorithms = frm.encryptionDataAlgorithms;
    saml.encryptionKeyAlgorithms = frm.encryptionKeyAlgorithms;
    saml.encryptionBlackListedAlgorithms = frm.encryptionBlackListedAlgorithms;
    saml.encryptionWhiteListedAlgorithms = frm.encryptionWhiteListedAlgorithms;
  }

}
