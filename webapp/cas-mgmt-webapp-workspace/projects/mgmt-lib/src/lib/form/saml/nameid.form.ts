import {FormControl, FormGroup} from '@angular/forms';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating SAML Name Id.
 *
 * @author Travis Schmidt
 */
export class NameidForm extends FormGroup {

  get requiredNameIdFormat() { return this.get('requiredNameIdFormat') as FormControl; }
  get serviceProviderNameIdQualifier() { return this.get('serviceProviderNameIdQualifier') as FormControl; }
  get nameIdQualifier() { return this.get('nameIdQualifier') as FormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      requiredNameIdFormat: new FormControl(service?.requiredNameIdFormat),
      serviceProviderNameIdQualifier: new FormControl(service?.serviceProviderNameIdQualifier),
      nameIdQualifier: new FormControl(service?.nameIdQualifier)
    });
  }

  /**
   * Maps form values to the passed DTO.
   *
   * @param service - SamlRegisteredService
   */
  map(service: SamlRegisteredService) {
    service.requiredNameIdFormat = this.requiredNameIdFormat.value;
    service.serviceProviderNameIdQualifier = this.serviceProviderNameIdQualifier.value;
    service.nameIdQualifier = this.nameIdQualifier.value;
  }
}
