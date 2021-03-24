import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl, FormGroup} from '@angular/forms';

/**
 * Form group for displaying and updating options for SAML assertions.
 *
 * @author Travis Schmidt
 */
export class AssertionForm extends FormGroup {

  get requiredAuthenticationContextClass() { return this.get('requiredAuthenticationContextClass') as FormControl; }
  get assertionAudiences() { return this.get('assertionAudiences') as FormControl; }
  get issuerEntityId() { return this.get('issuerEntityId') as FormControl; }
  get issuerSigningKeyLocation() { return this.get('issuerSigningKeyLocation') as FormControl; }
  get issuerSigningAlgorithm() { return this.get('issuerSigningAlgorithm') as FormControl; }
  get skewAllowance() { return this.get('skewAllowance') as FormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      requiredAuthenticationContextClass: new FormControl(service?.requiredAuthenticationContextClass),
      assertionAudiences: new FormControl(service?.assertionAudiences),
      issuerEntityId: new FormControl(service?.issuerEntityId),
      issuerSigningKeyLocation: new FormControl(service?.issuerSigningKeyLocation),
      issuerSigningAlgorithm: new FormControl(service?.issuerSigningAlgorithm),
      skewAllowance: new FormControl(service?.skewAllowance)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - SamlRegisteredService
   */
  map(service: SamlRegisteredService) {
    service.requiredAuthenticationContextClass = this.requiredAuthenticationContextClass.value;
    service.assertionAudiences = this.assertionAudiences.value;
    service.issuerEntityId = this.issuerEntityId.value;
    service.issuerSigningKeyLocation = this.issuerSigningKeyLocation.value;
    service.issuerSigningAlgorithm = this.issuerSigningAlgorithm.value;
  }
}
