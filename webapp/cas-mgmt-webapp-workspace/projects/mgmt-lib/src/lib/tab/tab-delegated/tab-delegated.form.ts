import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, DefaultRegisteredServiceDelegatedAuthenticationPolicy} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, DelegatedForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating delegated authentication options for a service.
 *
 * @author Travis Schmidt
 */
export class TabDelegatedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get auth() { return this.get('auth') as DelegatedForm; }
  set auth(c: DelegatedForm) { this.setControl('auth', c); }

  constructor(public service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets the controls in the form.
   */
  reset(): void {
    this.auth = new DelegatedForm(this.service?.accessStrategy?.delegatedAuthenticationPolicy);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    if (this.auth.dirty) {
      if (!service.accessStrategy.delegatedAuthenticationPolicy) {
        service.accessStrategy.delegatedAuthenticationPolicy = new DefaultRegisteredServiceDelegatedAuthenticationPolicy();
      }
      this.auth.map(service.accessStrategy.delegatedAuthenticationPolicy);
    }
  }
}
