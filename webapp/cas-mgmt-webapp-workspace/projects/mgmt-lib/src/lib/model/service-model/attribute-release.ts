import {
  attributeRepoFactory,
  PrincipalAttributesRepository
} from './attribute-repo.model';
import {attributeFilterFactory, RegisteredServiceAttributeFilter} from './attribute-filter.model';
import {
  consentPolicyFactory,
  RegisteredServiceConsentPolicy
} from './consent-policy.model';

/**
 * Data class for RegisteredServiceAttributeReleasePolicy.
 */
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
  policies: RegisteredServiceAttributeReleasePolicy[];

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

/**
 * Data class for AbstractRegisteredServiceAttributeReleasePolicy.
 */
export abstract class AbstractRegisteredServiceAttributeReleasePolicy extends RegisteredServiceAttributeReleasePolicy {
  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
  }
}

/**
 * Data class for ReturnAllAttributeReleasePolicy.
 */
export class ReturnAllAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ReturnAllAttributeReleasePolicy';

  /**
   * Returns true if the passed object is an instance of ReturnAllAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === this.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this['@class'] = ReturnAllAttributeReleasePolicy.cName;
  }
}

/**
 * Data class for DenyAllAttributeReleasePolicy.
 */
export class DenyAllAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.DenyAllAttributeReleasePolicy';

  /**
   * Returns true if the passed object is an instance of DenyAllAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === DenyAllAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this['@class'] = DenyAllAttributeReleasePolicy.cName;
  }
}

/**
 * Data class for ReturnMappedAttributeReleasePolicy.
 */
export class ReturnMappedAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ReturnMappedAttributeReleasePolicy';

  allowedAttributes: Map<string, string[]>;

  /**
   * Returns true if the passed object is an instance of ReturnMappedAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
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

/**
 * Data class for ReturnAllowedAttributeReleasePolicy.
 */
export class ReturnAllowedAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ReturnAllowedAttributeReleasePolicy';

  allowedAttributes: string[];

  /**
   * Returns true if the passed object is an instance of ReturnAllowedAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ReturnAllowedAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: ReturnAllowedAttributeReleasePolicy = ReturnAllowedAttributeReleasePolicy.instanceOf(policy)
      ? policy as ReturnAllowedAttributeReleasePolicy : undefined;
    this.allowedAttributes = p?.allowedAttributes ?? [];
    this['@class'] = ReturnAllowedAttributeReleasePolicy.cName;
  }
}

/**
 * Data class for ScriptedRegisteredServiceAttributeReleasePolicy.
 */
export class ScriptedRegisteredServiceAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ScriptedRegisteredServiceAttributeReleasePolicy';

  scriptFile: string;

  /**
   * Returns true if the passed object is an instance of ScriptedRegisteredServiceAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
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

/**
 * Data class for ReturnRestfulAttributeReleasePolicy.
 */
export class ReturnRestfulAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ReturnRestfulAttributeReleasePolicy';

  endpoint: string;

  /**
   * Returns true if the passed object is an instance of ReturnRestfulAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
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

/**
 * Data class for GroovyScriptAttributeReleasePolicy.
 */
export class GroovyScriptAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName =  'org.apereo.cas.services.GroovyScriptAttributeReleasePolicy';

  groovyScript: string;

  /**
   * Returns true if the passed object is an instance of GroovyScriptAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
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

/**
 * Data class for GroovySamlRegisteredServiceAttributeReleasePolicy.
 */
export class GroovySamlRegisteredServiceAttributeReleasePolicy extends ReturnAllowedAttributeReleasePolicy {
  static cName =  'org.apereo.cas.support.saml.services.GroovySamlRegisteredServiceAttributeReleasePolicy';

  groovyScript: string;

  /**
   * Returns true if the passed object is an instance of GroovySamlRegisteredServiceAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
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

/**
 * Data class for SamlIdpRegisteredServiceAttributeReleasePolicy.
 */
export class SamlIdpRegisteredServiceAttributeReleasePolicy extends ReturnMappedAttributeReleasePolicy {
  static cName =  'org.apereo.cas.support.saml.services.SamlIdpRegisteredServiceAttributeReleasePolicy';

  /**
   * Returns true if the passed object is an instance of SamlIdpRegisteredServiceAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
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

/**
 * Data class for WsFederationClaimsReleasePolicy.
 */
export class WsFederationClaimsReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.ws.idp.services.CustomNamespaceWSFederationClaimsReleasePolicy';

  allowedAttributes: Map<string, string>;

  /**
   * Returns true if the passed object is an instance of WsFederationClaimsReleasePolicy.
   *
   * @param obj - object to be inspected
   */
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

/**
 * Data class for InCommonRSAttributeReleasePolicy.
 */
export class InCommonRSAttributeReleasePolicy extends RegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.support.saml.services.InCommonRSAttributeReleasePolicy';

  /**
   * Returns true if the passed object is an instance of InCommonRSAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === InCommonRSAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this['@class'] = InCommonRSAttributeReleasePolicy.cName;
  }
}

/**
 * Data class for PatternMatchingEntityIdAttributeReleasePolicy.
 */
export class PatternMatchingEntityIdAttributeReleasePolicy extends RegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.support.saml.services.PatternMatchingEntityIdAttributeReleasePolicy';

  /**
   * Returns true if the passed object is an instance of PatternMatchingEntityIdAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === PatternMatchingEntityIdAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this['@class'] = PatternMatchingEntityIdAttributeReleasePolicy.cName;
  }
}

/**
 * Data class for MetadataEntityAttributesAttributeReleasePolicy.
 */
export class MetadataEntityAttributesAttributeReleasePolicy extends ReturnAllowedAttributeReleasePolicy {
  static cName = 'org.apereo.cas.support.saml.services.MetadataEntityAttributesAttributeReleasePolicy';

  entityAttribute: string;
  entityAttributeFormat: string;
  entityAttributeValues: string[];

  /**
   * Returns true if the passed object is an instance of MetadataEntityAttributesAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
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

/**
 * Data class for EduPersonTargetedIdAttributeReleasePolicy.
 */
export class EduPersonTargetedIdAttributeReleasePolicy extends ReturnAllowedAttributeReleasePolicy {
  static cName = 'org.apereo.cas.support.saml.services.EduPersonTargetedIdAttributeReleasePolicy';

  salt: string;
  attribute: string;

  /**
   * Returns true if the passed object is an instance of EduPersonTargetedIdAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === EduPersonTargetedIdAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: EduPersonTargetedIdAttributeReleasePolicy = EduPersonTargetedIdAttributeReleasePolicy.instanceOf(policy)
      ? policy as EduPersonTargetedIdAttributeReleasePolicy : undefined;
    this.salt = p?.salt;
    this.attribute = p?.attribute;
    this['@class'] = EduPersonTargetedIdAttributeReleasePolicy.cName;
  }
}

export class ChainingAttributeReleasePolicy extends AbstractRegisteredServiceAttributeReleasePolicy {
  static cName = 'org.apereo.cas.services.ChainingAttributeReleasePolicy';

  policies: RegisteredServiceAttributeReleasePolicy[];

  /**
   * Returns true if the passed object is an instance of EduPersonTargetedIdAttributeReleasePolicy.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === ChainingAttributeReleasePolicy.cName;
  }

  constructor(policy?: RegisteredServiceAttributeReleasePolicy) {
    super(policy);
    const p: ChainingAttributeReleasePolicy = ChainingAttributeReleasePolicy.instanceOf(policy)
      ? policy as ChainingAttributeReleasePolicy : undefined;
    this.policies = p?.policies;
    this['@class'] = ChainingAttributeReleasePolicy.cName;
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
  CHAINING
}

export enum PrincipalRepoType {
  DEFAULT,
  CACHING,
}

/**
 * Global factory function for RegisteredServiceAttributeReleasePolicy from js object.
 *
 * @param policy - Policy as js object
 * @param type - ReleasePolicyType
 */
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
  if (type === ReleasePolicyType.CHAINING || (!type && ChainingAttributeReleasePolicy.instanceOf(policy))) {
    return new ChainingAttributeReleasePolicy(policy);
  }
  if (!type && !policy) {
    return new ReturnAllowedAttributeReleasePolicy();
  }
  return policy;
}


