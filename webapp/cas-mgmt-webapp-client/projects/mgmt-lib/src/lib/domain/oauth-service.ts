import {RegexRegisteredService, RegisteredService} from './registered-service';

export class OAuthRegisteredService extends RegexRegisteredService {
  static cName = 'org.apereo.cas.support.oauth.services.OAuthRegisteredService';

  clientSecret: string;
  clientId: string;
  bypassApprovalPrompt: boolean;
  generateRefreshToken: boolean;
  supportedGrantTypes: string[];
  supportedResponseTypes: string[];

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === OAuthRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    this['@class'] = OAuthRegisteredService.cName;
    const s: OAuthRegisteredService = service as OAuthRegisteredService;
    this.clientSecret = (s && s.clientSecret) || null;
    this.clientId = (s && s.clientId) || null;
    this.bypassApprovalPrompt = (s && s.bypassApprovalPrompt) || false;
    this.generateRefreshToken = (s && s.generateRefreshToken) || false;
    this.supportedGrantTypes = (s && s.supportedGrantTypes) || null;
    this.supportedResponseTypes = (s && s.supportedResponseTypes) || null;
  }
}

export class OidcRegisteredService extends OAuthRegisteredService {
  static cName = 'org.apereo.cas.services.OidcRegisteredService';

  jwks: string;
  signIdToken: boolean;
  encryptIdToken: boolean;
  idTokenEncryptionAlg: string;
  idTokenEncryptionEncoding: string;
  dynamicallyRegistered: boolean;
  implicit: boolean;
  dynamicRegistrationDateTime: string;
  scopes: string[];
  subjectType: string;
  sectorIdentifierUri: string;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === OidcRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    const s: OidcRegisteredService = service as OidcRegisteredService;
    this.jwks = (s && s.jwks) || null;
    this.signIdToken = (s && s.signIdToken) || true;
    this.encryptIdToken = (s && s.encryptIdToken) || false;
    this.idTokenEncryptionAlg = (s && s.idTokenEncryptionEncoding) || null;
    this.idTokenEncryptionEncoding = (s && s.idTokenEncryptionEncoding) || null;
    this.dynamicallyRegistered = (s && s.dynamicallyRegistered) || null;
    this.implicit = (s && s.implicit) || false;
    this.dynamicRegistrationDateTime = (s && s.dynamicRegistrationDateTime) || null;
    this.scopes = (s && s.scopes) || null;
    this.subjectType = (s && s.subjectType) || 'PUBLIC';
    this.sectorIdentifierUri = (s && s.sectorIdentifierUri) || null;
    this['@class'] = OidcRegisteredService.cName;
  }
}
