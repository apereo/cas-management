export abstract class RegisteredServiceProperty {

  values: string[];

  constructor(prop?: RegisteredServiceProperty) {
    this.values = (prop && prop.values) || null;
  }
}

export class DefaultRegisteredServiceProperty extends RegisteredServiceProperty {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceProperty';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceProperty.cName;
  }

  constructor(prop?: RegisteredServiceProperty) {
    super(prop);
    this['@class'] = DefaultRegisteredServiceProperty.cName;
  }
}
