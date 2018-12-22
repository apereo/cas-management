import {FormArray, FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  AbstractRegisteredService,
  MgmtFormControl,
  DefaultRegisteredServiceContact}
from 'mgmt-lib';

export class ContactsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public data: DataRecord) {
    super({
      contacts: new FormArray([])
    });
  }

  init() {
    const contacts = new FormArray([]);
    if (this.data.service.contacts) {
      for (let i = 0; i < this.data.service.contacts.length; i++) {
        contacts.push(this.createContact());
      }
    }
    this.setValue(this.formMap());
  }

  formMap(): any {
    const contacts = {
      contacts: []
    };
    if (this.data.service.contacts) {
      for (let c of this.data.service.contacts) {
        contacts.contacts.push(this.createContactMap(c));
      }
    }
    return contacts;
  }

  mapForm(service: AbstractRegisteredService) {
    service.contacts = [];
    const frm = this.value;
    for (let c of frm.contacts) {
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
      email: new MgmtFormControl(null, null, Validators.required),
      phone: new MgmtFormControl(null),
      department: new MgmtFormControl(null)
    });
  }

  add(contact: DefaultRegisteredServiceContact) {
    (<FormArray>this.get('contacts')).push(
      new FormGroup({
        name: new MgmtFormControl(contact.name, null, Validators.required),
        email: new MgmtFormControl(contact.email, null, Validators.required),
        phone: new MgmtFormControl(contact.phone),
        department: new MgmtFormControl(contact.department)
      })
    )
  }
}
