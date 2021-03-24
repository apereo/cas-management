import {FormControl, FormGroup} from '@angular/forms';
import {OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
/**
 * Form group for displaying and updating options for Oidc Clients.
 *
 * @author Travis Schmidt
 */
export class OidcClientForm extends FormGroup {

  get tokenEndpointAuthenticationMethod() { return this.get('tokenEndpointAuthenticationMethod') as FormControl; }
  get applicationType() { return this.get('applicationType') as FormControl; }
  get subjectType() { return this.get('subjectType') as FormControl; }
  get sectorIdentifierUri() { return this.get('sectorIdentifierUri') as FormControl; }
  get dynamicRegistrationDateTime() { return this.get('dynamicRegistrationDateTime') as FormControl; }

  constructor(service: OidcRegisteredService) {
    super({
      tokenEndpointAuthenticationMethod: new FormControl(service?.tokenEndpointAuthenticationMethod),
      applicationType: new FormControl(service?.applicationType),
      subjectType: new FormControl(service?.subjectType),
      sectorIdentifierUri: new FormControl(service?.sectorIdentifierUri),
      dynamicRegistrationDateTime: new FormControl(service?.dynamicRegistrationDateTime)
    });
  }

  /**
   * Maps form values to the passed DTO.
   *
   * @param service - OidcRegisteredService
   */
  map(service: OidcRegisteredService) {
    service.tokenEndpointAuthenticationMethod = this.tokenEndpointAuthenticationMethod.value;
    service.applicationType = this.applicationType.value;
    service.subjectType = this.subjectType.value;
    service.sectorIdentifierUri = this.sectorIdentifierUri.value;
    service.dynamicRegistrationDateTime = this.dynamicRegistrationDateTime.value;
  }
}
