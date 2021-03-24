import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DefaultRegisteredServiceContact, AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
/**
 * Form group for displaying and updating a RegisteredContact.
 */
export class Contact extends FormGroup {

  get name() { return this.get('name') as FormControl; }
  get email() { return this.get('email') as FormControl; }
  get phone() { return this.get('phone') as FormControl; }
  get department() { return this.get('department') as FormControl; }

  constructor(contact: DefaultRegisteredServiceContact) {
    super({
      name: new FormControl(contact?.name, Validators.required),
      email: new FormControl(contact?.email, [Validators.required, Validators.email]),
      phone: new FormControl(contact?.phone),
      department: new FormControl(contact?.department)
    });
  }

  /**
   * Maps form values to the a DefaultRegisteredServiceContact.
   */
  map(): DefaultRegisteredServiceContact {
    const contact = new DefaultRegisteredServiceContact();
    contact.name = this.name.value;
    contact.email = this.email.value;
    contact.phone = this.phone.value;
    contact.department = this.department.value;
    return contact;
  }
}

/**
 * Form array for Contacts.
 */
export class ContactsForm extends FormArray {

  constructor(service: AbstractRegisteredService) {
    super([]);
    if (service && service.contacts) {
      service.contacts.forEach(c => {
        this.push(new Contact(c));
      });
    }
  }

  /**
   * Returns the array controls cast to Contact[].
   */
  rows(): Contact[] {
    return this.controls as Contact[];
  }

  /**
   * Returns the control at the index cas to Contact.
   *
   * @param index - index
   */
  rowAt(index: number): Contact {
    return this.at(index) as Contact;
  }

  /**
   * Adds a registered contact to the form.
   *
   * @param c - registered contact
   */
  addRow(c?: DefaultRegisteredServiceContact) {
    this.push(new Contact(c));
  }

  /**
   * Maps the form array to DefaultRegisteredServiceContact[].
   */
  map(): DefaultRegisteredServiceContact[] {
    return this.rows().map(r => r.map());
  }
}
