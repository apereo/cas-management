import {RegexRegisteredService, RegisteredService} from './registered-service.model';

export class SamlRegisteredService extends RegexRegisteredService {
  static cName = 'org.apereo.cas.support.saml.services.SamlRegisteredService';

  metadataLocation: string;
  metadataMaxValidity: number;
  requiredAuthenticationContextClass: string;
  metadataCriteriaDirection: string;
  metadataCriteriaPattern: string;
  requiredNameIdFormat: string;
  metadataSignatureLocation: string;
  requireSignedRoot: boolean;
  serviceProviderNameIdQualifier: string;
  nameIdQualifier: string;
  metadataExpirationDuration: string;
  signingCredentialFingerprint: string;
  issuerEntityId: string;
  signAssertions: boolean;
  skipGeneratingAssertionNameId: boolean;
  skipGeneratingSubjectConfirmationInResponseTo: boolean;
  skipGeneratingSubjectConfirmationNotOnOrAfter: boolean;
  skipGeneratingSubjectConfirmationRecipient: boolean;
  skipGeneratingSubjectConfirmationNotBefore: boolean;
  skipGeneratingSubjectConfirmationNameId: boolean;
  skipGeneratingTransientNameId: boolean;
  signResponses: boolean;
  encryptAssertions: boolean;
  encryptAttributes: boolean;
  encryptionOptional: boolean;
  metadataCriteriaRoles: string;
  metadataCriteriaRemoveEmptyEntitiesDescriptors: boolean;
  metadataCriteriaRemoveRolelessEntityDescriptors: boolean;
  signingCredentialType: string;
  assertionAudiences: string;
  skewAllowance: number;
  whiteListBlackListPrecedence: string;
  attributeNameFormats: Map<string, string>;
  attributeFriendlyNames: Map<string, string>;
  attributeValueTypes: Map<string, string>;
  encryptableAttributes: string[];
  signingSignatureReferenceDigestMethods: string[];
  signingSignatureAlgorithms: string[];
  signingSignatureBlackListedAlgorithms: string[];
  signingSignatureWhiteListedAlgorithms: string[];
  signingSignatureCanonicalizationAlgorithm: string;
  encryptionDataAlgorithms: string[];
  encryptionKeyAlgorithms: string[];
  encryptionBlackListedAlgorithms: string[];
  encryptionWhiteListedAlgorithms: string[];


  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === SamlRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    const s: SamlRegisteredService = SamlRegisteredService.instanceOf(service) ? service as SamlRegisteredService : undefined;
    this.metadataLocation = (s && s.metadataLocation) || null;
    this.metadataMaxValidity = (s && s.metadataMaxValidity) || null;
    this.requiredAuthenticationContextClass = (s && s.requiredAuthenticationContextClass) || null;
    this.metadataCriteriaDirection = (s && s.metadataCriteriaDirection) || null;
    this.metadataCriteriaPattern = (s && s.metadataCriteriaPattern) || null;
    this.requiredNameIdFormat = (s && s.requiredNameIdFormat) || null;
    this.metadataSignatureLocation = (s && s.metadataSignatureLocation) || null;
    this.serviceProviderNameIdQualifier = (s && s.serviceProviderNameIdQualifier) || null;
    this.nameIdQualifier = (s && s.nameIdQualifier) || null;
    this.metadataExpirationDuration = (s && s.metadataExpirationDuration) || 'PT60M';
    this.signAssertions = s ? s.signAssertions : false;
    this.signResponses = s ? s.signResponses : true;
    this.signingCredentialType = (s && s.signingCredentialType) || 'BASIC';
    this.encryptAssertions = s ? s.encryptAssertions : false;
    this.metadataCriteriaRoles = (s && s.metadataCriteriaRoles) || 'SPSSODescriptor';
    this.metadataCriteriaRemoveEmptyEntitiesDescriptors = s ? s.metadataCriteriaRemoveEmptyEntitiesDescriptors : true;
    this.metadataCriteriaRemoveRolelessEntityDescriptors = s ? s.metadataCriteriaRemoveRolelessEntityDescriptors : true;
    this.attributeNameFormats = (s && s.attributeNameFormats) || null;
    this.skipGeneratingAssertionNameId = s ? s.skipGeneratingAssertionNameId : false;
    this.skipGeneratingSubjectConfirmationInResponseTo = s ? s.skipGeneratingSubjectConfirmationInResponseTo : false;
    this.skipGeneratingSubjectConfirmationNotOnOrAfter = s ? s.skipGeneratingSubjectConfirmationNotOnOrAfter : false;
    this.skipGeneratingSubjectConfirmationRecipient = s ? s.skipGeneratingSubjectConfirmationRecipient : false;
    this.skipGeneratingSubjectConfirmationNotBefore = s ? s.skipGeneratingSubjectConfirmationNotBefore : true;
    this.assertionAudiences = (s && s.assertionAudiences) || null;
    this.requireSignedRoot = s ? s.requireSignedRoot : true;
    this.signingCredentialFingerprint = (s && s.signingCredentialFingerprint) || null;
    this.issuerEntityId = (s && s.issuerEntityId) || null;
    this.skipGeneratingSubjectConfirmationNameId = s ? s.skipGeneratingAssertionNameId : true;
    this.skipGeneratingTransientNameId = s ? s.skipGeneratingAssertionNameId : false;
    this.encryptAttributes = s ? s.encryptAttributes : false;
    this.encryptionOptional = s ? s.encryptionOptional : false;
    this.skewAllowance = (s && s.skewAllowance) || null;
    this.whiteListBlackListPrecedence = (s && s.whiteListBlackListPrecedence) || null;
    this.attributeFriendlyNames = (s && s.attributeFriendlyNames) ||  null;
    this.attributeValueTypes = (s && s.attributeValueTypes) || null;
    this.encryptableAttributes = (s && s.encryptableAttributes) || null;
    this.signingSignatureReferenceDigestMethods = (s && s.signingSignatureReferenceDigestMethods) || null;
    this.signingSignatureAlgorithms = (s && s.signingSignatureAlgorithms) || null;
    this.signingSignatureBlackListedAlgorithms = (s && s.signingSignatureBlackListedAlgorithms) || null;
    this.signingSignatureWhiteListedAlgorithms = (s && s.signingSignatureWhiteListedAlgorithms) || null;
    this.signingSignatureCanonicalizationAlgorithm = (s && s.signingSignatureCanonicalizationAlgorithm) || null;
    this.encryptionDataAlgorithms = (s && s.encryptionDataAlgorithms) || null;
    this.encryptionKeyAlgorithms = (s && s.encryptionKeyAlgorithms) || null;
    this.encryptionBlackListedAlgorithms = (s && s.encryptionBlackListedAlgorithms) || null;
    this.encryptionWhiteListedAlgorithms = (s && s.encryptionWhiteListedAlgorithms) || null;
    this['@class'] = SamlRegisteredService.cName;
  }
}
