export abstract class RegisteredServiceUsernameAttributeProvider {
  canonicalizationMode: string;
  encryptUsername: boolean;
}

export abstract class BaseRegisteredServiceUsernameAtttributeProvider extends RegisteredServiceUsernameAttributeProvider {

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super();
    this.canonicalizationMode = provider?.canonicalizationMode ?? 'NONE';
    this.encryptUsername = provider?.encryptUsername ?? false;
  }

}

export class DefaultRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.DefaultRegisteredServiceUsernameProvider';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DefaultRegisteredServiceUsernameProvider.cName;
  }

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super(provider);
    this['@class'] = DefaultRegisteredServiceUsernameProvider.cName;
  }
}

export class PrincipalAttributeRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.PrincipalAttributeRegisteredServiceUsernameProvider';

  usernameAttribute: string;

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

export class GroovyRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.GroovyRegisteredServiceUsernameProvider';

  groovyScript: string;

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

export class ScriptedRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.ScriptedRegisteredServiceUsernameProvider';

  script: string;

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

export class ShibbolethCompatiblePersistentIdGenerator {
  static cName = 'org.apereo.cas.authentication.principal.ShibbolethCompatiblePersistentIdGenerator';

  salt: string;
  attribute: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ShibbolethCompatiblePersistentIdGenerator.cName;
  }

  constructor(generator?: ShibbolethCompatiblePersistentIdGenerator) {
    this.salt = generator?.salt;
    this.attribute = generator?.attribute;
    this['@class'] = ShibbolethCompatiblePersistentIdGenerator.cName;
  }
}

export class AnonymousRegisteredServiceUsernameProvider extends BaseRegisteredServiceUsernameAtttributeProvider {
  static cName = 'org.apereo.cas.services.AnonymousRegisteredServiceUsernameAttributeProvider';

  persistentIdGenerator: ShibbolethCompatiblePersistentIdGenerator;

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
