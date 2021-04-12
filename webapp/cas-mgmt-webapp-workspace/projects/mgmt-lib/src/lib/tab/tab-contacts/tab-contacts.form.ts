import {ContactsForm, MgmtFormGroup} from '@apereo/mgmt-lib/src/lib/form';
import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for diplaying and updating contacts for a service.
 */
export class TabContactsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get contacts() { return this.get('contacts') as ContactsForm; }
  set contacts(c: ContactsForm) { this.setControl('contacts', c); }

  constructor(private service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.contacts = new ContactsForm(this.service);
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    service.contacts = this.contacts.map();
  }

}
