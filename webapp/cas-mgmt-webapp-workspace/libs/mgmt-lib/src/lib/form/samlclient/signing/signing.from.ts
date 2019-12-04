import {FormGroup} from '@angular/forms';
import {SamlRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class SigningFrom extends FormGroup {

  get signAssertions() { return this.get('signAssertions') as MgmtFormControl; }
  get signResponses() { return this.get('signResponses') as MgmtFormControl; }
  get signingCredentialType() { return this.get('signingCredentialType') as MgmtFormControl; }
  get signingCredentialFingerPrint() { return this.get('signingCredentialFingerPrint') as MgmtFormControl; }
  get signingSignatureReferenceDigestMethods() { return this.get('signingSignatureReferenceDigestMethods') as MgmtFormControl; }
  get signingSignatureAlgorithms() { return this.get('signingSignatureAlgorithms') as MgmtFormControl; }
  get signingSignatureBlackListedAlgorithms() { return this.get('signingSignatureBlackListedAlgorithms') as MgmtFormControl; }
  get signingSignatureWhiteListedAlgorithms() { return this.get('signingSignatureWhiteListedAlgorithms') as MgmtFormControl; }
  get signingSignatureCanonicalizationAlgorithm() { return this.get('signingSignatureCanonicalizationAlgorithm') as MgmtFormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      signAssertions: new MgmtFormControl(service && service.signAssertions),
      signResponses: new MgmtFormControl(service && service.signResponses),
      signingCredentialType: new MgmtFormControl(service && service.signingCredentialType),
      signingCredentialFingerPrint: new MgmtFormControl(service && service.signingCredentialFingerprint),
      signingSignatureReferenceDigestMethods: new MgmtFormControl(service && service.signingSignatureReferenceDigestMethods),
      signingSignatureAlgorithms: new MgmtFormControl(service && service.signingSignatureAlgorithms),
      signingSignatureBlackListedAlgorithms: new MgmtFormControl(service && service.signingSignatureBlackListedAlgorithms),
      signingSignatureWhiteListedAlgorithms: new MgmtFormControl(service && service.signingSignatureWhiteListedAlgorithms),
      signingSignatureCanonicalizationAlgorithm: new MgmtFormControl(service && service.signingSignatureCanonicalizationAlgorithm)
    });
  }

  mapForm(service: SamlRegisteredService) {
    service.signAssertions = this.signAssertions.value;
    service.signResponses = this.signResponses.value;
    service.signingCredentialType = this.signingCredentialType.value;
    service.signingCredentialFingerprint = this.signingCredentialFingerPrint.value;
    service.signingSignatureReferenceDigestMethods = this.signingSignatureReferenceDigestMethods.value;
    service.signingSignatureAlgorithms = this.signingSignatureAlgorithms.value;
    service.signingSignatureBlackListedAlgorithms = this.signingSignatureBlackListedAlgorithms.value;
    service.signingSignatureWhiteListedAlgorithms = this.signingSignatureWhiteListedAlgorithms.value;
    service.signingSignatureCanonicalizationAlgorithm = this.signingSignatureCanonicalizationAlgorithm.value;
  }
}
