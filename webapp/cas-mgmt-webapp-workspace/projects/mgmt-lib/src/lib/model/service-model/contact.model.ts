/**
 * Data class for RegisteredServiceContact.
 */
export class RegisteredServiceContact {
  static cName = 'org.apereo.cas.services.RegisteredServiceContact';

  name: string;
  email: string;
  phone: string;
  department: string;
}

/**
 * Data class for DefaultRegisteredServiceContact.
 */
export class DefaultRegisteredServiceContact extends RegisteredServiceContact {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceContact';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceContact.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceContact.cName;
  }

  constructor(contact?: RegisteredServiceContact) {
    super();
    this.name = contact?.name;
    this.email = contact?.email;
    this.phone = contact?.phone;
    this.department = contact?.department;
    this['@class'] = DefaultRegisteredServiceContact.cName;
  }
}

/**
 * Global factory function to create a list of RegisteredServiceContact from js object.
 *
 * @param input - contact list as js object
 */
export function contactsFactory(input: any[]): RegisteredServiceContact[] {
  const contacts: DefaultRegisteredServiceContact[] = [];
  if (input) {
    input.forEach((val) => {
      contacts.push(new DefaultRegisteredServiceContact(val));
    });
  }
  return contacts;
}
