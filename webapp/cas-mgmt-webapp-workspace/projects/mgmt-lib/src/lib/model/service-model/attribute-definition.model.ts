
/**
 * Defines attribute definitions.
 */
export class DefaultAttributeDefinition {
  static cName = 'org.apereo.cas.authentication.attribute.DefaultAttributeDefinition';

  key: string;
  name: string;
  scoped: boolean;
  encrypted: boolean;
  attribute: string;
  patternFormat: string;
  script: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceChainingAttributeFilter.
   *
   * @param obj - object to be inspected
   */
  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === DefaultAttributeDefinition.cName;
  }

  constructor(definition?: DefaultAttributeDefinition) {
    const d: DefaultAttributeDefinition = DefaultAttributeDefinition.instanceof(definition)
      ? definition as DefaultAttributeDefinition : undefined;
    this['@class'] = DefaultAttributeDefinition.cName;
    this.key = d?.key;
    this.name = d?.name;
    this.scoped = d?.scoped ?? false;
    this.encrypted = d?.encrypted ?? false;
    this.attribute = d?.attribute;
    this.patternFormat = d?.patternFormat;
    this.script = d?.script;
  }
}

/**
 * Defines attribute definitions.
 */
export class SamlIdPAttributeDefinition extends DefaultAttributeDefinition {
  static cName = 'org.apereo.cas.support.saml.web.idp.profile.builders.attr.SamlIdPAttributeDefinition';

  friendlyName: string;
  urn: string;

  /**
   * Returns true if the passed object is an instance of RegisteredServiceChainingAttributeFilter.
   *
   * @param obj - object to be inspected
   */
  static instanceof(obj: any): boolean {
    return obj && obj['@class'] === SamlIdPAttributeDefinition.cName;
  }

  constructor(definition?: DefaultAttributeDefinition) {
    super(definition);
    const d: SamlIdPAttributeDefinition = SamlIdPAttributeDefinition.instanceof(definition)
      ? definition as SamlIdPAttributeDefinition : undefined;
    this['@class'] = SamlIdPAttributeDefinition.cName;
    this.friendlyName = d?.friendlyName;
    this.urn = d?.urn;
  }

}


