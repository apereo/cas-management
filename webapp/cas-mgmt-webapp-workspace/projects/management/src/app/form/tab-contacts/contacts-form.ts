import {FormArray, FormGroup, Validators} from '@angular/forms';
import {AbstractRegisteredService, DefaultRegisteredServiceContact} from 'domain-lib';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';

export class ContactsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: AbstractRegisteredService) {
    super({
      contacts: new FormArray([])
    });
    if (this.service.contacts) {
      for (let i = 0; i < this.service.contacts.length; i++) {
        (<FormArray>this.get('contacts')).push(this.createContact());
      }
    }
    this.setValue(this.formMap());
  }

  formMap(): any {
    const contacts = {
      contacts: []
    };
    if (this.service.contacts) {
      for (const c of this.service.contacts) {
        contacts.contacts.push(this.createContactMap(c));
      }
    }
    return contacts;
  }

  mapForm(service: AbstractRegisteredService) {
    service.contacts = [];
    const frm = this.value;
    for (const c of frm.contacts) {
      const index = service.contacts.length;
      service.contacts.push(new DefaultRegisteredServiceContact());
      service.contacts[index].name = c.name;
      service.contacts[index].email = c.email;
      service.contacts[index].department = c.department;
      service.contacts[index].phone = c.phone;
    }
  }

  createContactMap(contact: DefaultRegisteredServiceContact): any {
    return {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        department: contact.department
    };
  }

  createContact(): FormGroup {
    return new FormGroup({
      name: new MgmtFormControl(null, null, Validators.required),
      email: new MgmtFormControl(null, null, [Validators.required, Validators.email]),
      phone: new MgmtFormControl(null),
      department: new MgmtFormControl(null)
    });
  }

  add(contact: DefaultRegisteredServiceContact) {
    const c = this.createContact();
    c.setValue(this.createContactMap(contact));
    (<FormArray>this.get('contacts')).push(c);
  }
}
