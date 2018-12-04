import {Component} from '@angular/core';
import {
  DefaultRegisteredServiceContact,
  DataRecord,
  UserService
} from 'mgmt-lib';
import {ContactsForm} from './contacts-form';

@Component({
  selector: 'app-tab-contacts',
  templateUrl: './tab-contacts.component.html',
  styleUrls: ['./tab-contacts.component.css']
})
export class TabContactsComponent {

  contacts: ContactsForm;

  constructor(public data: DataRecord,
              private user: UserService) {
    if (this.data.formMap.has('contacts')) {
      this.contacts = this.data.formMap.get('contacts') as ContactsForm;
      return;
    }
    this.contacts = new ContactsForm(this.data);
    if (!this.user.user.administrator
        && (!this.data.service.contacts || this.data.service.contacts.length === 0)) {
      const contact: DefaultRegisteredServiceContact = new DefaultRegisteredServiceContact();
      contact.name = this.user.user.firstName + ' ' + this.user.user.familyName;
      contact.email = this.user.user.email;
      contact.phone = this.user.user.phone;
      contact.department = this.user.user.department;
      this.contacts.add(contact);
    }
    this.data.formMap.set('contacts', this.contacts);
  }
}
