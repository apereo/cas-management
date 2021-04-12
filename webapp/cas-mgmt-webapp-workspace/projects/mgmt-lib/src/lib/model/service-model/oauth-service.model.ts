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

/**
 * Data class for OAuthRegisteredService.
 */
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

  /**
   * Returns true if the passed object is an instance of OAuthRegisteredService.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === OAuthRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    this['@class'] = OAuthRegisteredService.cName;
    const s: OAuthRegisteredService = OAuthRegisteredService.instanceOf(service) || OidcRegisteredService.instanceOf(service)
      ? service as OAuthRegisteredService : undefined;
    this.clientSecret = s?.clientSecret;
    this.clientId = s?.clientId;
    this.bypassApprovalPrompt = s?.bypassApprovalPrompt ?? false;
    this.generateRefreshToken = s?.generateRefreshToken ?? false;
    this.supportedGrantTypes = s?.supportedGrantTypes;
    this.supportedResponseTypes = s?.supportedResponseTypes;
    this.jwtAccessToken = s?.jwtAccessToken ?? false;
    this.codeExpirationPolicy = codeExpirationPolicy(s?.codeExpirationPolicy);
    this.accessTokenExpirationPolicy = accessTokenExpirationPolicy(s?.accessTokenExpirationPolicy);
    this.refreshTokenExpirationPolicy = refreshTokenExpirationPolicy(s?.refreshTokenExpirationPolicy);
    this.deviceTokenExpirationPolicy = deviceTokenExpirationPolicy(s?.deviceTokenExpirationPolicy);
  }
}

/**
 * Data class for OidcRegisteredService.
 */
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


  /**
   * Returns true if the passed object is an instance of OidcRegisteredService.
   *
   * @param obj - object to be inspected
   */
  static instanceOf(obj: any): boolean {
    return obj && obj['@class'] === OidcRegisteredService.cName;
  }

  constructor(service?: RegisteredService) {
    super(service);
    const s: OidcRegisteredService = OidcRegisteredService.instanceOf(service)
      ? service as OidcRegisteredService : undefined;
    this.jwks = s?.jwks;
    this.jwksCacheDuration = s?.jwksCacheDuration;
    this.jwksCacheTimeUnit = s?.jwksCacheTimeUnit;
    this.tokenEndpointAuthenticationMethod = s?.tokenEndpointAuthenticationMethod ?? 'client_secret_basic';
    this.signIdToken = s?.signIdToken ?? true;
    this.encryptIdToken = s?.encryptIdToken ?? false;
    this.idTokenEncryptionAlg = s?.idTokenEncryptionEncoding;
    this.idTokenEncryptionEncoding = s?.idTokenEncryptionEncoding;
    this.idTokenSigningAlg = s?.idTokenSigningAlg;
    this.userInfoSigningAlg = s?.userInfoSigningAlg;
    this.userInfoEncryptedResponseAlg = s?.userInfoEncryptedResponseAlg;
    this.userInfoEncryptedResponseEncoding = s?.userInfoEncryptedResponseEncoding;
    this.dynamicallyRegistered = s?.dynamicallyRegistered ?? false;
    this.dynamicRegistrationDateTime = s?.dynamicRegistrationDateTime;
    this.scopes = s?.scopes;
    this.subjectType = s?.subjectType ?? 'PUBLIC';
    this.sectorIdentifierUri = s?.sectorIdentifierUri;
    this.applicationType = s?.applicationType ?? 'web';
    this['@class'] = OidcRegisteredService.cName;
  }

}
