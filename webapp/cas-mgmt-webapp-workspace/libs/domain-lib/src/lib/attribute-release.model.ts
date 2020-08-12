import {attributeRepoFactory, PrincipalAttributesRepository} from './attribute-repo.model';
import {attributeFilterFactory, RegisteredServiceAttributeFilter} from './attribute-filter.model';
import {consentPolicyFactory, RegisteredServiceConsentPolicy} from './consent-policy.model';

export abstract class RegisteredServiceAttributeReleasePolicy {
  attributeFilter: RegisteredServiceAttributeFilter;
  principalAttributesRepository: PrincipalAttributesRepository;
  authorizedToReleaseCredentialPassword: boolean;
  authorizedToReleaseProxyGrantingTicket: boolean;
  excludeDefaultAttributes: boolean;
  authorizedToReleaseAuthenticationAttributes: boolean;
  principalIdAttribute: string;
  consentPolicy: RegisteredServiceConsentPolicy;
  order: number;

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    this.attributeFilter = attributeFilterFactory(policy?.attributeFilter);
    this.principalAttributesRepository = attributeRepoFactory(policy?.principalAttributesRepository);
    this.authorizedToReleaseCredentialPassword = policy?.authorizedToReleaseCredentialPassword ?? false;
    this.authorizedToReleaseProxyGrantingTicket = policy?.authorizedToReleaseProxyGrantingTicket ?? false;
    this.excludeDefaultAttributes = policy?.excludeDefaultAttributes;
    this.principalIdAttribute = policy?.principalIdAttribute;
    this.authorizedToReleaseAuthenticationAttributes = policy?.authorizedToReleaseAuthenticationAttributes ?? true;
    this.consentPolicy = consentPolicyFactory(policy?.consentPolicy);
    this.order = policy?.order ?? 0;
  }
}

export abstract class AbstractRegisteredServiceAttributeReleasePolicy extends RegisteredServiceAttributeReleasePolicy {
  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
  }
}

export class ReturnAllAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ReturnAllAttributeReleasePolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === this.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this['@class'] = ReturnAllAttributeReleasePolicy.cName;
  }
}

export class DenyAllAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.DenyAllAttributeReleasePolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DenyAllAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this['@class'] = DenyAllAttributeReleasePolicy.cName;
  }
}

export class ReturnMappedAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ReturnMappedAttributeReleasePolicy';

  allowedAttributes: Map<string, string[]>;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ReturnMappedAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: ReturnMappedAttributeReleasePolicy = ReturnMappedAttributeReleasePolicy.instanceOf(policy)
      ? policy as ReturnMappedAttributeReleasePolicy : undefined;
    this.allowedAttributes = p?.allowedAttributes;
    this['@class'] = ReturnMappedAttributeReleasePolicy.cName;
  }
}

export class ReturnAllowedAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ReturnAllowedAttributeReleasePolicy';

  allowedAttributes: string[];

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ReturnAllowedAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: ReturnAllowedAttributeReleasePolicy = ReturnAllowedAttributeReleasePolicy.instanceOf(policy)
      ? policy as ReturnAllowedAttributeReleasePolicy : undefined;
    this.allowedAttributes = p?.allowedAttributes;
    this['@class'] = ReturnAllowedAttributeReleasePolicy.cName;
  }
}

export class ScriptedRegisteredServiceAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ScriptedRegisteredServiceAttributeReleasePolicy';

  scriptFile: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ScriptedRegisteredServiceAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: ScriptedRegisteredServiceAttributeReleasePolicy = ScriptedRegisteredServiceAttributeReleasePolicy.instanceOf(policy)
      ? policy as ScriptedRegisteredServiceAttributeReleasePolicy : undefined;
    this.scriptFile = p?.scriptFile;
    this['@class'] = ScriptedRegisteredServiceAttributeReleasePolicy.cName;
  }
}

export class ReturnRestfulAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ReturnRestfulAttributeReleasePolicy';

  endpoint: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ReturnRestfulAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: ReturnRestfulAttributeReleasePolicy = ReturnRestfulAttributeReleasePolicy.instanceOf(policy)
      ? policy as ReturnRestfulAttributeReleasePolicy : undefined;
    this.endpoint = p?.endpoint;
    this['@class'] = ReturnRestfulAttributeReleasePolicy.cName;
  }
}

export class GroovyScriptAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName =  'org.apereo.cas.services.GroovyScriptAttributeReleasePolicy';

  groovyScript: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovyScriptAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: GroovyScriptAttributeReleasePolicy = GroovyScriptAttributeReleasePolicy.instanceOf(policy)
      ? policy as GroovyScriptAttributeReleasePolicy : undefined;
    this.groovyScript = p?.groovyScript;
    this['@class'] = GroovyScriptAttributeReleasePolicy.cName;
  }
}

export class GroovySamlRegisteredServiceAttributeReleasePolicy extends ReturnAllowedAttributeReleasePolicy {
  static cName =  'org.apereo.cas.support.saml.services.GroovySamlRegisteredServiceAttributeReleasePolicy';

  groovyScript: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === GroovySamlRegisteredServiceAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: GroovySamlRegisteredServiceAttributeReleasePolicy = GroovySamlRegisteredServiceAttributeReleasePolicy.instanceOf(policy)
      ? policy as GroovySamlRegisteredServiceAttributeReleasePolicy : undefined;
    this.groovyScript = p?.groovyScript;
    this['@class'] = GroovySamlRegisteredServiceAttributeReleasePolicy.cName;
  }
}

export class SamlIdpRegisteredServiceAttributeReleasePolicy extends ReturnMappedAttributeReleasePolicy {
  static cName =  'org.apereo.cas.support.saml.services.SamlIdpRegisteredServiceAttributeReleasePolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === SamlIdpRegisteredServiceAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: SamlIdpRegisteredServiceAttributeReleasePolicy = SamlIdpRegisteredServiceAttributeReleasePolicy.instanceOf(policy)
      ? policy as SamlIdpRegisteredServiceAttributeReleasePolicy : undefined;
    this.allowedAttributes = p?.allowedAttributes;
    this['@class'] = SamlIdpRegisteredServiceAttributeReleasePolicy.cName;
  }
}

export class WsFederationClaimsReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.ws.idp.services.WsFederationClaimsReleasePolicy';

  allowedAttributes: Map<string, string>;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === WsFederationClaimsReleasePolicy.cName;
  }

  constructor(policy?: AbstractRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: WsFederationClaimsReleasePolicy = WsFederationClaimsReleasePolicy.instanceOf(policy)
      ? policy as WsFederationClaimsReleasePolicy : undefined;
    this.allowedAttributes = p?.allowedAttributes;
    this['@class'] = WsFederationClaimsReleasePolicy.cName;
  }
}

export class InCommonRSAttributeReleasePolicy extends RegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.support.saml.services.InCommonRSAttributeReleasePolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === InCommonRSAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this['@class'] = InCommonRSAttributeReleasePolicy.cName;
  }
}

export class PatternMatchingEntityIdAttributeReleasePolicy extends RegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.support.saml.services.PatternMatchingEntityIdAttributeReleasePolicy';

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === PatternMatchingEntityIdAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this['@class'] = PatternMatchingEntityIdAttributeReleasePolicy.cName;
  }
}

export class MetadataEntityAttributesAttributeReleasePolicy extends ReturnAllowedAttributeReleasePolicy {
  static cName = 'org.apereo.cas.support.saml.services.MetadataEntityAttributesAttributeReleasePolicy';

  entityAttribute: string;
  entityAttributeFormat: string;
  entityAttributeValues: string[];

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === MetadataEntityAttributesAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: MetadataEntityAttributesAttributeReleasePolicy = MetadataEntityAttributesAttributeReleasePolicy.instanceOf(policy)
      ? policy as MetadataEntityAttributesAttributeReleasePolicy : undefined;
    this.entityAttribute = p?.entityAttribute;
    this.entityAttributeFormat = p?.entityAttributeFormat;
    this.entityAttributeValues = p?.entityAttributeValues;
    this['@class'] = MetadataEntityAttributesAttributeReleasePolicy.cName;
  }
}

export enum ReleasePolicyType {
  RETURN_ALL,
  DENY_ALL,
  RETURN_MAPPED,
  RETURN_ALLOWED,
  SCRIPT,
  GROOVY,
  INCOMMON,
  MATCHING,
  METADATA,
  RESTFUL,
  GROOVY_SAML,
  WS_FED,
  SAML_IDP,
}

export enum PrincipalRepoType {
  DEFAULT,
  CACHING,
}

export function attributeReleaseFactory(policy?: any, type?: ReleasePolicyType): RegisteredServiceAttributeReleasePolicy {
  if (type === ReleasePolicyType.RETURN_ALL || (!type && ReturnAllAttributeReleasePolicy.instanceOf(policy))) {
    return new ReturnAllAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.DENY_ALL || (!type && DenyAllAttributeReleasePolicy.instanceOf(policy))) {
    return new DenyAllAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.RETURN_MAPPED || (!type && ReturnMappedAttributeReleasePolicy.instanceOf(policy))) {
    return new ReturnMappedAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.RETURN_ALLOWED || (!type && ReturnAllowedAttributeReleasePolicy.instanceOf(policy))) {
    return new ReturnAllowedAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.SCRIPT || (!type && ScriptedRegisteredServiceAttributeReleasePolicy.instanceOf(policy))) {
    return new ScriptedRegisteredServiceAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.GROOVY || (!type && GroovyScriptAttributeReleasePolicy.instanceOf(policy))) {
    return new GroovyScriptAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.INCOMMON || (!type && InCommonRSAttributeReleasePolicy.instanceOf(policy))) {
    return new InCommonRSAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.MATCHING || (!type && PatternMatchingEntityIdAttributeReleasePolicy.instanceOf(policy))) {
    return new PatternMatchingEntityIdAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.METADATA || (!type && MetadataEntityAttributesAttributeReleasePolicy.instanceOf(policy))) {
    return new MetadataEntityAttributesAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.RESTFUL || (!type && ReturnRestfulAttributeReleasePolicy.instanceOf(policy))) {
    return new ReturnRestfulAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.GROOVY_SAML || (!type && GroovySamlRegisteredServiceAttributeReleasePolicy.instanceOf(policy))) {
    return new GroovySamlRegisteredServiceAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.WS_FED || (!type && WsFederationClaimsReleasePolicy.instanceOf(policy))) {
    return new WsFederationClaimsReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.SAML_IDP || (!type && SamlIdpRegisteredServiceAttributeReleasePolicy.instanceOf(policy))) {
    return new SamlIdpRegisteredServiceAttributeReleasePolicy(policy);
  }
  if (!type && !policy) {
    return new DenyAllAttributeReleasePolicy();
  }
  return policy;
}


