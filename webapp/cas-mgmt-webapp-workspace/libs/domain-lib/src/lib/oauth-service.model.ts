import {RegexRegisteredService, RegisteredService} from './registered-service.model';
import {codeExpirationPolicy, RegisteredServiceOAuthCodeExpirationPolicy} from './code-expiration.model';
import {
  accessTokenExpirationPolicy,
  RegisteredServiceOAuthAccessTokenExpirationPolicy
} from './access-token-expiration.model';
import {
  refreshTokenExpirationPolicy,
  RegisteredServiceOAuthRefreshTokenExpirationPolicy
} from './refresh-token-expiration.model';
import {
  deviceTokenExpirationPolicy,
  RegisteredServiceOAuthDeviceTokenExpirationPolicy
} from './device-token-expiration.model';

export class OAuthRegisteredService extends RegexRegisteredService {
  static cName = 'org.apereo.cas.support.oauth.services.OAuthRegisteredService';

  clientSecret: string;
  clientId: string;
  bypassApprovalPrompt: boolean;
  generateRefreshToken: boolean;
  supportedGrantTypes: string[];
  supportedResponseTypes: string[];
  jwtAccessToken: boolean;
  codeExpirationPolicy: RegisteredServiceOAuthCodeExpirationPolicy;
  accessTokenExpirationPolicy: RegisteredServiceOAuthAccessTokenExpirationPolicy;
  refreshTokenExpirationPolicy: RegisteredServiceOAuthRefreshTokenExpirationPolicy;
  deviceTokenExpirationPolicy: RegisteredServiceOAuthDeviceTokenExpirationPolicy;

  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === OAuthRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    this['@class'] = OAuthRegisteredService.cName;
    const s: OAuthRegisteredService = OAuthRegisteredService.instanceOf(service) || OidcRegisteredService.instanceOf(service)
      ? service as OAuthRegisteredService : undefined;
    this.clientSecret = (s && s.clientSecret) || null;
    this.clientId = (s && s.clientId) || null;
    this.bypassApprovalPrompt = s ? s.bypassApprovalPrompt : false;
    this.generateRefreshToken = s ? s.generateRefreshToken : false;
    this.supportedGrantTypes = (s && s.supportedGrantTypes) || null;
    this.supportedResponseTypes = (s && s.supportedResponseTypes) || null;
    this.jwtAccessToken = s ? s.jwtAccessToken : false;
    this.codeExpirationPolicy = codeExpirationPolicy(s && s.codeExpirationPolicy);
    this.accessTokenExpirationPolicy = accessTokenExpirationPolicy(s && s.accessTokenExpirationPolicy);
    this.refreshTokenExpirationPolicy = refreshTokenExpirationPolicy(s && s.refreshTokenExpirationPolicy);
    this.deviceTokenExpirationPolicy = deviceTokenExpirationPolicy(s && s.deviceTokenExpirationPolicy);
  }
}

export class OidcRegisteredService extends OAuthRegisteredService {
  static cName = 'org.apereo.cas.services.OidcRegisteredService';

  jwks: string;
  jwksCacheDuration: number;
  jwksCacheTimeUnit: string;
  tokenEndpointAuthenticationMethod: string;
  signIdToken: boolean;
  encryptIdToken: boolean;
  idTokenEncryptionAlg: string;
  idTokenEncryptionEncoding: string;
  idTokenSigningAlg: string;
  userInfoSigningAlg: string;
  userInfoEncryptedResponseAlg: string;
  userInfoEncryptedResponseEncoding: string;
  dynamicallyRegistered: boolean;
  dynamicRegistrationDateTime: string;
  scopes: string[];
  subjectType: string;
  sectorIdentifierUri: string;
  applicationType: string;


  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === OidcRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    const s: OidcRegisteredService = OidcRegisteredService.instanceOf(service)
      ? service as OidcRegisteredService : undefined;
    this.jwks = (s && s.jwks) || null;
    this.jwksCacheDuration = (s && s.jwksCacheDuration) || null;
    this.jwksCacheTimeUnit = (s && s.jwksCacheTimeUnit) || null;
    this.tokenEndpointAuthenticationMethod = (s && s.tokenEndpointAuthenticationMethod) || 'client_secret_basic';
    this.signIdToken = s ? s.signIdToken : true;
    this.encryptIdToken = s ? s.encryptIdToken : false;
    this.idTokenEncryptionAlg = (s && s.idTokenEncryptionEncoding) || null;
    this.idTokenEncryptionEncoding = (s && s.idTokenEncryptionEncoding) || null;
    this.idTokenSigningAlg = (s && s.idTokenSigningAlg) || null;
    this.userInfoSigningAlg = (s && s.userInfoSigningAlg) || null;
    this.userInfoEncryptedResponseAlg = (s && s.userInfoEncryptedResponseAlg) || null;
    this.userInfoEncryptedResponseEncoding = (s && s.userInfoEncryptedResponseEncoding) || null;
    this.dynamicallyRegistered = s ? s.dynamicallyRegistered : false;
    this.dynamicRegistrationDateTime = (s && s.dynamicRegistrationDateTime) || null;
    this.scopes = (s && s.scopes) || null;
    this.subjectType = (s && s.subjectType) || 'PUBLIC';
    this.sectorIdentifierUri = (s && s.sectorIdentifierUri) || null;
    this.applicationType = (s && s.applicationType) || 'web';
    this['@class'] = OidcRegisteredService.cName;
  }

}
