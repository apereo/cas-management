import {FormArray, FormGroup, Validators} from '@angular/forms';
import {DefaultRegisteredServiceContact, AbstractRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class Row extends FormGroup {
  get name() { return this.get('name') as MgmtFormControl; }
  get email() { return this.get('email') as MgmtFormControl; }
  get phone() { return this.get('phone') as MgmtFormControl; }
  get department() { return this.get('department') as MgmtFormControl; }

  constructor(contact: DefaultRegisteredServiceContact) {
    super({
      name: new MgmtFormControl(contact && contact.name, '', Validators.required),
      email: new MgmtFormControl(contact && contact.email, '', [Validators.required, Validators.email]),
      phone: new MgmtFormControl(contact && contact.phone),
      department: new MgmtFormControl(contact && contact.department)
    });
  }

  mapForm(): DefaultRegisteredServiceContact {
    const contact = new DefaultRegisteredServiceContact();
    contact.name = this.name.value;
    contact.email = this.email.value;
    contact.phone = this.phone.value;
    contact.department = this.department.value;
    return contact;
  }
}

export class ContactsForm extends FormArray {

  constructor(service: AbstractRegisteredService) {
    super([]);
    if (service && service.contacts) {
      service.contacts.forEach(c => {
        this.push(new Row(c));
      });
    }
  }

  rows(): Row[] {
    return this.controls as Row[];
  }

  rowAt(index: number): Row {
    return this.at(index) as Row;
  }

  addRow(c?: DefaultRegisteredServiceContact) {
    this.push(new Row(c));
  }

  mapForm(): DefaultRegisteredServiceContact[] {
    return this.rows().map(r => r.mapForm());
  }
}
