import {FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  MgmtFormControl,
  AbstractRegisteredService,
  OidcRegisteredService
} from 'mgmt-lib';

export class OidcForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: OidcRegisteredService) {
    super({
      clientId: new MgmtFormControl(null, null, Validators.required),
      clientSecret: new MgmtFormControl(null, null, Validators.required),
      bypassApprovalPrompt: new MgmtFormControl(null),
      generateRefreshToken: new MgmtFormControl(null),
      jwks: new MgmtFormControl(null, null, Validators.required),
      signIdToken: new MgmtFormControl(null),
      implicit: new MgmtFormControl(null),
      encryptIdToken: new MgmtFormControl(null),
      idTokenEncryptionAlg: new MgmtFormControl(null, null, Validators.required),
      idTokenEncryptionEncoding: new MgmtFormControl(null, null, Validators.required),
      subjectType: new MgmtFormControl(null),
      sectorIdentifierUri: new MgmtFormControl(null),
      dynamicRegistrationDateTime: new MgmtFormControl(null),
      responseTypes: new MgmtFormControl(null),
      grantTypes: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      clientId: this.service.clientId,
      clientSecret: this.service.clientSecret,
      bypassApprovalPrompt: this.service.bypassApprovalPrompt,
      generateRefreshToken: this.service.generateRefreshToken,
      jwks: this.service.jwks,
      signIdToken: this.service.signIdToken,
      implicit: this.service.implicit,
      encryptIdToken: this.service.encryptIdToken,
      idTokenEncryptionAlg: this.service.idTokenEncryptionAlg,
      idTokenEncryptionEncoding: this.service.idTokenEncryptionEncoding,
      subjectType: this.service.subjectType,
      sectorIdentifierUri: this.service.sectorIdentifierUri,
      dynamicRegistrationDateTime: this.service.dynamicRegistrationDateTime,
      responseTypes: this.service.supportedResponseTypes,
      grantTypes: this.service.supportedGrantTypes
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OidcRegisteredService = service as OidcRegisteredService;
    const frm = this.value;
    srv.clientId =  frm.clientId;
    srv.clientSecret = frm.clientSecret;
    srv.bypassApprovalPrompt = frm.bypassApprovalPrompt;
    srv.generateRefreshToken = frm.generateRefreshToken;
    srv.jwks = frm.jwks;
    srv.signIdToken = frm.signIdToken;
    srv.implicit = frm.implicit;
    srv.encryptIdToken = frm.encryptIdToken;
    srv.idTokenEncryptionAlg = frm.idTokenEncryptionAlg;
    srv.idTokenEncryptionEncoding = frm.idTokenEncryptionEncoding;
    srv.subjectType = frm.subjectType;
    srv.sectorIdentifierUri = frm.sectorIdentifierUri;
    srv.dynamicRegistrationDateTime = frm.dynamicRegistrationDateTime;
    srv.supportedResponseTypes = frm.responseTypes;
    srv.supportedGrantTypes = frm.grantTypes;
  }
}
