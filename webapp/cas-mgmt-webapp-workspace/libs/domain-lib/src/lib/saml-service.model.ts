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
    this.metadataLocation = s?.metadataLocation;
    this.metadataMaxValidity = s?.metadataMaxValidity;
    this.requiredAuthenticationContextClass = s?.requiredAuthenticationContextClass;
    this.metadataCriteriaDirection = s?.metadataCriteriaDirection;
    this.metadataCriteriaPattern = s?.metadataCriteriaPattern;
    this.requiredNameIdFormat = s?.requiredNameIdFormat;
    this.metadataSignatureLocation = s?.metadataSignatureLocation;
    this.serviceProviderNameIdQualifier = s?.serviceProviderNameIdQualifier;
    this.nameIdQualifier = s?.nameIdQualifier;
    this.metadataExpirationDuration = s?.metadataExpirationDuration ?? 'PT60M';
    this.signAssertions = s?.signAssertions ?? false;
    this.signResponses = s?.signResponses ?? true;
    this.signingCredentialType = s?.signingCredentialType ?? 'BASIC';
    this.encryptAssertions = s?.encryptAssertions ?? false;
    this.metadataCriteriaRoles = s?.metadataCriteriaRoles ?? 'SPSSODescriptor';
    this.metadataCriteriaRemoveEmptyEntitiesDescriptors = s?.metadataCriteriaRemoveEmptyEntitiesDescriptors ?? true;
    this.metadataCriteriaRemoveRolelessEntityDescriptors = s?.metadataCriteriaRemoveRolelessEntityDescriptors ?? true;
    this.attributeNameFormats = s?.attributeNameFormats;
    this.skipGeneratingAssertionNameId = s?.skipGeneratingAssertionNameId ?? false;
    this.skipGeneratingSubjectConfirmationInResponseTo = s?.skipGeneratingSubjectConfirmationInResponseTo ?? false;
    this.skipGeneratingSubjectConfirmationNotOnOrAfter = s?.skipGeneratingSubjectConfirmationNotOnOrAfter ?? false;
    this.skipGeneratingSubjectConfirmationRecipient = s?.skipGeneratingSubjectConfirmationRecipient ?? false;
    this.skipGeneratingSubjectConfirmationNotBefore = s?.skipGeneratingSubjectConfirmationNotBefore ?? true;
    this.assertionAudiences = s?.assertionAudiences;
    this.requireSignedRoot = s?.requireSignedRoot ?? true;
    this.signingCredentialFingerprint = s?.signingCredentialFingerprint;
    this.issuerEntityId = s?.issuerEntityId;
    this.skipGeneratingSubjectConfirmationNameId = s?.skipGeneratingAssertionNameId ?? true;
    this.skipGeneratingTransientNameId = s?.skipGeneratingAssertionNameId ?? false;
    this.encryptAttributes = s?.encryptAttributes ?? false;
    this.encryptionOptional = s?.encryptionOptional ?? false;
    this.skewAllowance = s?.skewAllowance;
    this.whiteListBlackListPrecedence = s?.whiteListBlackListPrecedence;
    this.attributeFriendlyNames = s?.attributeFriendlyNames;
    this.attributeValueTypes = s?.attributeValueTypes;
    this.encryptableAttributes = s?.encryptableAttributes;
    this.signingSignatureReferenceDigestMethods = s?.signingSignatureReferenceDigestMethods;
    this.signingSignatureAlgorithms = s?.signingSignatureAlgorithms;
    this.signingSignatureBlackListedAlgorithms = s?.signingSignatureBlackListedAlgorithms;
    this.signingSignatureWhiteListedAlgorithms = s?.signingSignatureWhiteListedAlgorithms;
    this.signingSignatureCanonicalizationAlgorithm = s?.signingSignatureCanonicalizationAlgorithm;
    this.encryptionDataAlgorithms = s?.encryptionDataAlgorithms;
    this.encryptionKeyAlgorithms = s?.encryptionKeyAlgorithms;
    this.encryptionBlackListedAlgorithms = s?.encryptionBlackListedAlgorithms;
    this.encryptionWhiteListedAlgorithms = s?.encryptionWhiteListedAlgorithms;
    this['@class'] = SamlRegisteredService.cName;
  }
}
