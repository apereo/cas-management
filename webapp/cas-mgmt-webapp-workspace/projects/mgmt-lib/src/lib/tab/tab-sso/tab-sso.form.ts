import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, SsoForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating sso policies for a service.
 *
 * @author Travis Schmidt
 */
export class TabSsoForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get sso() { return this.get('sso') as SsoForm; }
  set sso(c: SsoForm) { this.setControl('sso', c); }

  constructor(public service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets the controls in the form.
   */
  reset() {
    this.sso = new SsoForm(this.service);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    this.sso.map(service);
  }
}
