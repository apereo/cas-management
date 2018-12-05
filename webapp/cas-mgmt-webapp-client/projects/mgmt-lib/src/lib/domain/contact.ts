export class RegisteredServiceContact {
  static cName = "org.apereo.cas.services.RegisteredServiceContact";

  name: String;
  email: String;
  phone: String;
  department: String;
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
