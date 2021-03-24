/**
 * Data class for RegisteredServiceProperty.
 */
export abstract class RegisteredServiceProperty {

  values: string[];

  constructor(prop?: RegisteredServiceProperty) {
    this.values = prop?.values;
  }
}

/**
 * Data class for DefaultRegisteredServiceProperty.
 */
export class DefaultRegisteredServiceProperty extends RegisteredServiceProperty {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceProperty';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceProperty.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceProperty.cName;
  }

  constructor(prop?: RegisteredServiceProperty) {
    super(prop);
    this['@class'] = DefaultRegisteredServiceProperty.cName;
  }
}
