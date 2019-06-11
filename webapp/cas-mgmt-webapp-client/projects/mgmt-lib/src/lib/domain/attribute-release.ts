import {
  attributeRepoFactory,
  DefaultPrincipalAttributesRepository,
  PrincipalAttributesRepository
} from './attribute-repo';
import {attributeFilterFactory, RegisteredServiceAttributeFilter} from './attribute-filter';
import {
  consentPolicyFactory,
  DefaultRegisteredServiceConsentPolicy,
  RegisteredServiceConsentPolicy
} from './consent-policy';

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
    this.attributeFilter = attributeFilterFactory(policy && policy.attributeFilter);
    this.principalAttributesRepository = attributeRepoFactory(policy && policy.principalAttributesRepository);
    this.authorizedToReleaseCredentialPassword = (policy && policy.authorizedToReleaseCredentialPassword) || null;
    this.authorizedToReleaseProxyGrantingTicket = (policy && policy.authorizedToReleaseProxyGrantingTicket) || null;
    this.excludeDefaultAttributes = (policy && policy.excludeDefaultAttributes) || null;
    this.principalIdAttribute = (policy && policy.principalIdAttribute) || null;
    this.authorizedToReleaseAuthenticationAttributes = (policy && policy.authorizedToReleaseAuthenticationAttributes) || true;
    this.consentPolicy = consentPolicyFactory(policy && policy.consentPolicy);
    this.order = (policy && policy.order) || 0;
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
    const p: ReturnMappedAttributeReleasePolicy = policy as ReturnMappedAttributeReleasePolicy;
    this.allowedAttributes = (p && p.allowedAttributes) || null;
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
    const p: ReturnAllowedAttributeReleasePolicy = policy as ReturnAllowedAttributeReleasePolicy;
    this.allowedAttributes = (p && p.allowedAttributes) || null;
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
    const p: ScriptedRegisteredServiceAttributeReleasePolicy = policy as ScriptedRegisteredServiceAttributeReleasePolicy;
    this.scriptFile = (p && p.scriptFile) || null;
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
    const p: ReturnRestfulAttributeReleasePolicy = policy as ReturnRestfulAttributeReleasePolicy;
    this.endpoint = (p && p.endpoint) || null;
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
    const p: GroovyScriptAttributeReleasePolicy = policy as GroovyScriptAttributeReleasePolicy;
    this.groovyScript = (p && p.groovyScript) || null;
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
    const p: GroovySamlRegisteredServiceAttributeReleasePolicy = policy as GroovySamlRegisteredServiceAttributeReleasePolicy;
    this.groovyScript = (p && p.groovyScript) || null;
    this['@class'] = GroovySamlRegisteredServiceAttributeReleasePolicy.cName;
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
    const p: WsFederationClaimsReleasePolicy = policy as WsFederationClaimsReleasePolicy;
    this.allowedAttributes = (p && p.allowedAttributes) || null;
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
    const p: MetadataEntityAttributesAttributeReleasePolicy = policy as MetadataEntityAttributesAttributeReleasePolicy;
    this.entityAttribute = (p && p.entityAttribute) || null;
    this.entityAttributeFormat = (p && p.entityAttributeFormat) || null;
    this.entityAttributeValues = (p && p.entityAttributeValues) || null;
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
  WS_FED
}

export enum PrincipalRepoType {
  DEFAULT,
  CACHING,
}

export function attributeReleaseFactory(policy?: any, type?: ReleasePolicyType): RegisteredServiceAttributeReleasePolicy {
  if (type === ReleasePolicyType.RETURN_ALL || ReturnAllAttributeReleasePolicy.instanceOf(policy)) {
    return new ReturnAllAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.DENY_ALL || DenyAllAttributeReleasePolicy.instanceOf(policy)) {
    return new DenyAllAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.RETURN_MAPPED || ReturnMappedAttributeReleasePolicy.instanceOf(policy)) {
    return new ReturnMappedAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.RETURN_ALLOWED || ReturnAllowedAttributeReleasePolicy.instanceOf(policy)) {
    return new ReturnAllowedAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.SCRIPT || ScriptedRegisteredServiceAttributeReleasePolicy.instanceOf(policy)) {
    return new ScriptedRegisteredServiceAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.GROOVY || GroovyScriptAttributeReleasePolicy.instanceOf(policy)) {
    return new GroovyScriptAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.INCOMMON || InCommonRSAttributeReleasePolicy.instanceOf(policy)) {
    return new InCommonRSAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.MATCHING || PatternMatchingEntityIdAttributeReleasePolicy.instanceOf(policy)) {
    return new PatternMatchingEntityIdAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.METADATA || MetadataEntityAttributesAttributeReleasePolicy.instanceOf(policy)) {
    return new MetadataEntityAttributesAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.RESTFUL || ReturnRestfulAttributeReleasePolicy.instanceOf(policy)) {
    return new ReturnRestfulAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.GROOVY_SAML || GroovySamlRegisteredServiceAttributeReleasePolicy.instanceOf(policy)) {
    return new GroovySamlRegisteredServiceAttributeReleasePolicy(policy);
  }
  if (type === ReleasePolicyType.WS_FED || WsFederationClaimsReleasePolicy.instanceOf(policy)) {
    return new WsFederationClaimsReleasePolicy(policy);
  }
  if (!type && !policy) {
    return new ReturnAllowedAttributeReleasePolicy();
  }
  return policy;
}


