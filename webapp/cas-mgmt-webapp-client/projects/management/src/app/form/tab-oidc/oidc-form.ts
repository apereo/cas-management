import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';
import {AbstractRegisteredService, OidcRegisteredService} from 'domain-lib';

export class OidcForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: OidcRegisteredService) {
    super({
      jwks: new MgmtFormControl(null, null),
      jwksCacheDuration: new MgmtFormControl(null),
      jwksCacheTimeUnit: new MgmtFormControl(null),
      tokenEndpointAuthenticationMethod: new MgmtFormControl(null),
      signIdToken: new MgmtFormControl(null),
      implicit: new MgmtFormControl(null),
      encryptIdToken: new MgmtFormControl(null),
      idTokenEncryptionAlg: new MgmtFormControl(null, null),
      idTokenEncryptionEncoding: new MgmtFormControl(null, null),
      idTokenSigningAlg: new MgmtFormControl(null),
      userInfoSigningAlg: new MgmtFormControl(null),
      userInfoEncryptedResponseAlg: new MgmtFormControl(null),
      userInfoEncryptedResponseEncoding: new MgmtFormControl(null),
      applicationType: new MgmtFormControl(null),
      subjectType: new MgmtFormControl(null),
      sectorIdentifierUri: new MgmtFormControl(null),
      dynamicRegistrationDateTime: new MgmtFormControl(null),
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      jwks: this.service.jwks,
      jwksCacheDuration: this.service.jwksCacheDuration,
      jwksCacheTimeUnit: this.service.jwksCacheTimeUnit,
      tokenEndpointAuthenticationMethod: this.service.tokenEndpointAuthenticationMethod,
      signIdToken: this.service.signIdToken,
      implicit: this.service.implicit,
      encryptIdToken: this.service.encryptIdToken,
      idTokenEncryptionAlg: this.service.idTokenEncryptionAlg,
      idTokenEncryptionEncoding: this.service.idTokenEncryptionEncoding,
      idTokenSigningAlg: this.service.idTokenSigningAlg,
      userInfoSigningAlg: this.service.userInfoSigningAlg,
      userInfoEncryptedResponseAlg: this.service.userInfoEncryptedResponseAlg,
      userInfoEncryptedResponseEncoding: this.service.userInfoEncryptedResponseEncoding,
      applicationType: this.service.applicationType,
      subjectType: this.service.subjectType,
      sectorIdentifierUri: this.service.sectorIdentifierUri,
      dynamicRegistrationDateTime: this.service.dynamicRegistrationDateTime,
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OidcRegisteredService = service as OidcRegisteredService;
    const frm = this.value;
    srv.jwks = frm.jwks;
    srv.jwksCacheDuration = frm.jwksCacheDuration;
    srv.jwksCacheTimeUnit = frm.jwksCacheTimeUnit;
    srv.tokenEndpointAuthenticationMethod = frm.tokenEndpointAuthenticationMethod;
    srv.signIdToken = frm.signIdToken;
    srv.implicit = frm.implicit;
    srv.encryptIdToken = frm.encryptIdToken;
    srv.idTokenEncryptionAlg = frm.idTokenEncryptionAlg;
    srv.idTokenEncryptionEncoding = frm.idTokenEncryptionEncoding;
    srv.idTokenSigningAlg = frm.idTokenSigningAlg;
    srv.userInfoSigningAlg = frm.userInfoSigningAlg;
    srv.userInfoEncryptedResponseAlg = frm.userInfoEncryptedResponseAlg;
    srv.userInfoEncryptedResponseEncoding = frm.userInfoEncryptedResponseEncoding;
    srv.applicationType = frm.applicationType;
    srv.subjectType = frm.subjectType;
    srv.sectorIdentifierUri = frm.sectorIdentifierUri;
    srv.dynamicRegistrationDateTime = frm.dynamicRegistrationDateTime;
  }
}
