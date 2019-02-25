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

  constructor() {
    super();
    this.name = null;
    this.email = null;
    this.phone = null;
    this.department = null;
    this['@class'] = DefaultRegisteredServiceContact.cName;
  }
}
