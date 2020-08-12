import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService} from 'domain-lib';
import {ContactsForm, MgmtFormGroup} from 'mgmt-lib';

export class TabContactsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get contacts() { return this.get('contacts') as ContactsForm; }

  constructor(service: AbstractRegisteredService) {
    super({
      contacts: new ContactsForm(service)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    service.contacts = this.contacts.mapForm();
  }

}
