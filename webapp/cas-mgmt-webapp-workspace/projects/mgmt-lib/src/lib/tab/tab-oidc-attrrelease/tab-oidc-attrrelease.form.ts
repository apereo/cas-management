import {FormControl, FormGroup} from '@angular/forms';
import {OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Form group for displaying and update Oidc Attributes.
 *
 * @author Travis Schmidt
 */
export class TabOidcAttrForm extends FormGroup implements MgmtFormGroup<OidcRegisteredService> {

  get scopes() { return this.get('scopes') as FormControl; }
  set scopes(c: FormControl) { this.setControl('scopes', c); }

  constructor(private service: OidcRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.scopes = new FormControl(this.service?.scopes);
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - OidcRegisteredService
   */
  map(service: OidcRegisteredService) {
    service.scopes = this.scopes.value;
  }

}
