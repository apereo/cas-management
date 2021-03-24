import {AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl, FormGroup} from '@angular/forms';
import {MgmtFormGroup} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating logout options for a service.
 *
 * @author Travis Schmidt
 */
export class TabLogoutForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get logout() { return this.get('logout') as FormControl; }
  set logout(c: FormControl) { this.setControl('logout', c); }
  get logoutType() { return this.get('logoutType') as FormControl; }
  set logoutType(c: FormControl) { this.setControl('logoutType', c); }

  constructor(private service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * .
   */
  reset(): void {
    this.logout = new FormControl(this.service?.logoutUrl);
    this.logoutType = new FormControl(this.service?.logoutType);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    service.logoutUrl = this.logout.value;
    service.logoutType = this.logoutType.value;
  }
}
