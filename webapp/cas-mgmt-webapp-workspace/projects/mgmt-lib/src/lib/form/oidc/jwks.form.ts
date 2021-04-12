import {FormControl, FormGroup} from '@angular/forms';
import {OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating options for JWKS.
 *
 * @author Travis Schmidt
 */
export class JwksForm extends FormGroup {

  get jwks() { return this.get('jwks') as FormControl; }
  get jwksCacheDuration() { return this.get('jwksCacheDuration') as FormControl; }
  get jwksCacheTimeUnit() { return this.get('jwksCacheTimeUnit') as FormControl; }

  constructor(service: OidcRegisteredService) {
    super({
      jwks: new FormControl(service?.jwks),
      jwksCacheDuration: new FormControl(service?.jwksCacheDuration),
      jwksCacheTimeUnit: new FormControl(service?.jwksCacheTimeUnit),
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - OidcRegisteredService
   */
  map(service: OidcRegisteredService) {
    service.jwks = this.jwks.value;
    service.jwksCacheDuration = this.jwksCacheDuration.value;
    service.jwksCacheTimeUnit = this.jwksCacheTimeUnit.value;
  }
}
