import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, SigningFrom} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating saml signing options for a service.
 *
 * @author Travis Schmidt
 */
export class TabSamlSigningForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get signing() { return this.get('signing') as SigningFrom; }
  set signing(c: SigningFrom) { this.setControl('singning', c); }

  constructor(private service: SamlRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.signing = new SigningFrom(this.service);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    this.signing.map(service as SamlRegisteredService);
  }

}
