export abstract class RegisteredServiceUsernameAttributeProvider {
  canonicalizationMode: string;
  encryptUsername: boolean;
}

export abstract class BaseRegisteredServiceUsernameAtttributeProvider extends RegisteredServiceUsernameAttributeProvider {

  constructor(provider?: RegisteredServiceUsernameAttributeProvider) {
    super();
    this.canonicalizationMode = (provider && provider.canonicalizationMode) || 'NONE';
    this.encryptUsername = provider && provider.encryptUsername || false;
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
    const p: PrincipalAttributeRegisteredServiceUsernameProvider = provider as PrincipalAttributeRegisteredServiceUsernameProvider;
    this.usernameAttribute = (p && p.usernameAttribute) || null;
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
    const p: GroovyRegisteredServiceUsernameProvider = provider as GroovyRegisteredServiceUsernameProvider;
    this.groovyScript = (p && p.groovyScript) || null;
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
    const p: ScriptedRegisteredServiceUsernameProvider = provider as ScriptedRegisteredServiceUsernameProvider;
    this.script = (p && p.script) || null;
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
    this.salt = (generator && generator.salt) || null;
    this.attribute = (generator && generator.attribute) || null;
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
    const p: AnonymousRegisteredServiceUsernameProvider = provider as AnonymousRegisteredServiceUsernameProvider;
    this.persistentIdGenerator = (p && this.persistentIdGenerator) || new ShibbolethCompatiblePersistentIdGenerator();
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

export function usernameProviderFactory(provider?: any): RegisteredServiceUsernameAttributeProvider {
  if (DefaultRegisteredServiceUsernameProvider.instanceOf(provider)) {
    return new DefaultRegisteredServiceUsernameProvider(provider);
  }
  if (PrincipalAttributeRegisteredServiceUsernameProvider.instanceOf(provider)) {
    return new PrincipalAttributeRegisteredServiceUsernameProvider(provider);
  }
  if (GroovyRegisteredServiceUsernameProvider.instanceOf(provider)) {
    return new GroovyRegisteredServiceUsernameProvider(provider);
  }
  if (ScriptedRegisteredServiceUsernameProvider.instanceOf(provider)) {
    return new ScriptedRegisteredServiceUsernameProvider(provider)
  }
  if (AnonymousRegisteredServiceUsernameProvider.instanceOf(provider)) {
    return new AnonymousRegisteredServiceUsernameProvider(provider);
  }
}
