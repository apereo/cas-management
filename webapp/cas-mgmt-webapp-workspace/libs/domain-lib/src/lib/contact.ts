export class RegisteredServiceContact {
  static cName = 'org.apereo.cas.services.RegisteredServiceContact';

  name: string;
  email: string;
  phone: string;
  department: string;
}

export class DefaultRegisteredServiceContact extends RegisteredServiceContact {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceContact';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceContact.cName;
  }

  constructor(contact?: RegisteredServiceContact) {
    super();
    this.name = contact && contact.name || null;
    this.email = contact && contact.email || null;
    this.phone = contact && contact.phone || null;
    this.department = contact && contact.department || null;
    this['@class'] = DefaultRegisteredServiceContact.cName;
  }
}

export function contactsFactory(input: any[]) {
  const contacts: DefaultRegisteredServiceContact[] = [];
  if (input) {
    input.forEach((val) => {
      contacts.push(new DefaultRegisteredServiceContact(val));
    });
  }
  return contacts;
}
