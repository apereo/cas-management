import {FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  MgmtFormGroup,
  SamlRegisteredService,
  MgmtFormControl
} from 'mgmt-lib';

export class SamlSigningForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: SamlRegisteredService) {
    super({
      signAssertions: new MgmtFormControl(null),
      signResponses: new MgmtFormControl(null),
      signingCredentialType: new MgmtFormControl(null),
      signingCredentialFingerPrint: new MgmtFormControl(null),
      signingSignatureReferenceDigestMethods: new MgmtFormControl(null),
      signingSignatureAlgorithms: new MgmtFormControl(null),
      signingSignatureBlackListedAlgorithms: new MgmtFormControl(null),
      signingSignatureWhiteListedAlgorithms: new MgmtFormControl(null),
      signingSignatureCanonicalizationAlgorithm: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      signAssertions: this.service.signAssertions,
      signResponses: this.service.signResponses,
      signingCredentialType: this.service.signingCredentialType,
      signingCredentialFingerPrint: this.service.signingCredentialFingerprint,
      signingSignatureReferenceDigestMethods: this.service.signingSignatureReferenceDigestMethods,
      signingSignatureAlgorithms: this.service.signingSignatureAlgorithms,
      signingSignatureBlackListedAlgorithms: this.service.signingSignatureBlackListedAlgorithms,
      signingSignatureWhiteListedAlgorithms: this.service.signingSignatureWhiteListedAlgorithms,
      signingSignatureCanonicalizationAlgorithm: this.service.signingSignatureCanonicalizationAlgorithm
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const saml: SamlRegisteredService = service as SamlRegisteredService;
    const frm = this.value;
    saml.signAssertions = frm.signAssertions;
    saml.signResponses =  frm.signResponses;
    saml.signingCredentialType = frm.signingCredentialType;
    saml.signingCredentialFingerprint = frm.signingCredentialFingerprint;
    saml.signingSignatureReferenceDigestMethods = frm.signingSignatureReferenceDigestMethods;
    saml.signingSignatureAlgorithms = frm.signingSignatureAlgorithms;
    saml.signingSignatureBlackListedAlgorithms = frm.signingSignatureBlackListedAlgorithms;
    saml.signingSignatureWhiteListedAlgorithms = frm.signingSignatureWhiteListedAlgorithms;
    saml.signingSignatureCanonicalizationAlgorithm = frm.signingSignatureCanonicalizationAlgorithm;
  }

}
