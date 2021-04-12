import {FormControl, FormGroup} from '@angular/forms';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Signing options for the assertion.
 *
 * @author Travis Schmidt
 */
export class SigningFrom extends FormGroup {

  get signAssertions() { return this.get('signAssertions') as FormControl; }
  get signResponses() { return this.get('signResponses') as FormControl; }
  get signingCredentialType() { return this.get('signingCredentialType') as FormControl; }
  get signingCredentialFingerPrint() { return this.get('signingCredentialFingerPrint') as FormControl; }
  get signingSignatureReferenceDigestMethods() { return this.get('signingSignatureReferenceDigestMethods') as FormControl; }
  get signingSignatureAlgorithms() { return this.get('signingSignatureAlgorithms') as FormControl; }
  get signingSignatureBlackListedAlgorithms() { return this.get('signingSignatureBlackListedAlgorithms') as FormControl; }
  get signingSignatureWhiteListedAlgorithms() { return this.get('signingSignatureWhiteListedAlgorithms') as FormControl; }
  get signingSignatureCanonicalizationAlgorithm() { return this.get('signingSignatureCanonicalizationAlgorithm') as FormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      signAssertions: new FormControl(service?.signAssertions),
      signResponses: new FormControl(service?.signResponses),
      signingCredentialType: new FormControl(service?.signingCredentialType),
      signingCredentialFingerPrint: new FormControl(service?.signingCredentialFingerprint),
      signingSignatureReferenceDigestMethods: new FormControl(service?.signingSignatureReferenceDigestMethods),
      signingSignatureAlgorithms: new FormControl(service?.signingSignatureAlgorithms),
      signingSignatureBlackListedAlgorithms: new FormControl(service?.signingSignatureBlackListedAlgorithms),
      signingSignatureWhiteListedAlgorithms: new FormControl(service?.signingSignatureWhiteListedAlgorithms),
      signingSignatureCanonicalizationAlgorithm: new FormControl(service?.signingSignatureCanonicalizationAlgorithm)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - SamlRegisteredService
   */
  map(service: SamlRegisteredService) {
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
