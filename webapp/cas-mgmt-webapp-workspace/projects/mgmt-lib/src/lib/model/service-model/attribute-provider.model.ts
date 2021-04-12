/**
 * Data class for
 */
export abstract class RegisteredServiceUsernameAttributeProvider {
  canonicalizationMode: string;
  encryptUsername: boolean;
}

/**
 * Data class for BaseRegisteredServiceUsernameAtttributeProvider.
 */
export abstract class BaseRegisteredServiceUsernameAtttributeProvider extends RegisteredServiceUsernameAttributeProvider {

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super();
    this.canonicalizationMode = provider?.canonicalizationMode ?? 'NONE';
    this.encryptUsername = provider?.encryptUsername ?? false;
  }

}

/**
 * Data class for DefaultRegisteredServiceUsernameProvider.
 */
export class DefaultRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceUsernameProvider';

  /**
   * Returns true if the passed object is an instance of DefaultRegisteredServiceUsernameProvider.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceUsernameProvider.cName;
  }

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super(provider);
    this['@class'] = DefaultRegisteredServiceUsernameProvider.cName;
  }
}

/**
 * Data class for PrincipalAttributeRegisteredServiceUsernameProvider.
 */
export class PrincipalAttributeRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.PrincipalAttributeRegisteredServiceUsernameProvider';

  usernameAttribute: string;

  /**
   * Returns true if the passed object is an instance of PrincipalAttributeRegisteredServiceUsernameProvider.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === PrincipalAttributeRegisteredServiceUsernameProvider.cName;
  }

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super(provider);
    const p: PrincipalAttributeRegisteredServiceUsernameProvider = PrincipalAttributeRegisteredServiceUsernameProvider.instanceOf(provider)
      ? provider as PrincipalAttributeRegisteredServiceUsernameProvider : undefined;
    this.usernameAttribute = p?.usernameAttribute;
    this['@class'] = PrincipalAttributeRegisteredServiceUsernameProvider.cName;
  }
}

/**
 * Data class for GroovyRegisteredServiceUsernameProvider.
 */
export class GroovyRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.GroovyRegisteredServiceUsernameProvider';

  groovyScript: string;

  /**
   * Returns true if the passed object is an instance of GroovyRegisteredServiceUsernameProvider.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovyRegisteredServiceUsernameProvider.cName;
  }

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super(provider);
    const p: GroovyRegisteredServiceUsernameProvider = GroovyRegisteredServiceUsernameProvider.instanceOf(provider)
      ? provider as GroovyRegisteredServiceUsernameProvider : undefined;
    this.groovyScript = p?.groovyScript;
    this['@class'] = GroovyRegisteredServiceUsernameProvider.cName;
  }
}

/**
 * Data class for ScriptedRegisteredServiceUsernameProvider.
 */
export class ScriptedRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.ScriptedRegisteredServiceUsernameProvider';

  script: string;

  /**
   * Returns true if the passed object is an instance of ScriptedRegisteredServiceUsernameProvider.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ScriptedRegisteredServiceUsernameProvider.cName;
  }

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super(provider);
    const p: ScriptedRegisteredServiceUsernameProvider = ScriptedRegisteredServiceUsernameProvider.instanceOf(provider)
      ? provider as ScriptedRegisteredServiceUsernameProvider : undefined;
    this.script = p?.script;
    this['@class'] = ScriptedRegisteredServiceUsernameProvider.cName;
  }
}

/**
 * Data class for ShibbolethCompatiblePersistentIdGenerator.
 */
export class ShibbolethCompatiblePersistentIdGenerator {
  static cName = 'org.apereo.cas.authentication.principal.ShibbolethCompatiblePersistentIdGenerator';

  salt: string;
  attribute: string;

  /**
   * Returns true if the passed object is an instance of ShibbolethCompatiblePersistentIdGenerator.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ShibbolethCompatiblePersistentIdGenerator.cName;
  }

  constructor(generator?: ShibbolethCompatiblePersistentIdGenerator) {
    this.salt = generator?.salt;
    this.attribute = generator?.attribute;
    this['@class'] = ShibbolethCompatiblePersistentIdGenerator.cName;
  }
}

/**
 * Data class for AnonymousRegisteredServiceUsernameProvider.
 */
export class AnonymousRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.AnonymousRegisteredServiceUsernameAttributeProvider';

  persistentIdGenerator: ShibbolethCompatiblePersistentIdGenerator;

  /**
   * Returns true if the passed object is an instance of AnonymousRegisteredServiceUsernameProvider.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === AnonymousRegisteredServiceUsernameProvider.cName;
  }

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super(provider);
    const p: AnonymousRegisteredServiceUsernameProvider = AnonymousRegisteredServiceUsernameProvider.instanceOf(provider)
      ? provider as AnonymousRegisteredServiceUsernameProvider : undefined;
    this.persistentIdGenerator = p?.persistentIdGenerator ?? new ShibbolethCompatiblePersistentIdGenerator();
    this['@class'] = AnonymousRegisteredServiceUsernameProvider.cName;
  }
}

export enum UserAttributeType {
  DEFAULT,
  PRINCIPAL_ATTRIBUTE,
  ANONYMOUS,
  SCRIPTED,
  GROOVY,
}

/**
 * Global factory function to create RegisteredServiceUsernameAttributeProvider form js object.
 *
 * @param provider - Provider as js object
 * @param type - UserAttributeType
 */
export function usernameProviderFactory(provider?: any, type?: UserAttributeType): RegisteredServiceUsernameAttributeProvider {
  if (type === UserAttributeType.DEFAULT || (!type && DefaultRegisteredServiceUsernameProvider.instanceOf(provider))) {
    return new DefaultRegisteredServiceUsernameProvider(provider);
  }
  if (type === UserAttributeType.PRINCIPAL_ATTRIBUTE
    || (!type && PrincipalAttributeRegisteredServiceUsernameProvider.instanceOf(provider))) {
    return new PrincipalAttributeRegisteredServiceUsernameProvider(provider);
  }
  if (type === UserAttributeType.GROOVY || (!type && GroovyRegisteredServiceUsernameProvider.instanceOf(provider))) {
    return new GroovyRegisteredServiceUsernameProvider(provider);
  }
  if (type === UserAttributeType.SCRIPTED || (!type && ScriptedRegisteredServiceUsernameProvider.instanceOf(provider))) {
    return new ScriptedRegisteredServiceUsernameProvider(provider);
  }
  if (type === UserAttributeType.ANONYMOUS || (!type && AnonymousRegisteredServiceUsernameProvider.instanceOf(provider))) {
    return new AnonymousRegisteredServiceUsernameProvider(provider);
  }
  return provider;
}
