import {FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AbstractRegisteredService,
  OidcRegisteredService
} from 'mgmt-lib';

export class OidcForm extends MgmtFormGroup {

  constructor(public data: DataRecord) {
    super();
    this.form = new FormGroup({
      clientId: new MgmtFormControl(null, null, Validators.required),
      clientSecret: new MgmtFormControl(null, null, Validators.required),
      bypassApprovalPrompt: new MgmtFormControl(null),
      generateRefreshToken: new MgmtFormControl(null),
      jwks: new MgmtFormControl(null, null, Validators.required),
      scopes_userdefined: new MgmtFormControl(null),
      signIdToken: new MgmtFormControl(null),
      implicit: new MgmtFormControl(null),
      encryptIdToken: new MgmtFormControl(null),
      idTokenEncryptionAlg: new MgmtFormControl(null, null, Validators.required),
      idTokenEncryptionEncoding: new MgmtFormControl(null, null, Validators.required),
      subjectType: new MgmtFormControl(null),
      sectorIdentifierUri: new MgmtFormControl(null),
      dynamicRegistrationDateTime: new MgmtFormControl(null)
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    const oidc: OidcRegisteredService = this.data.service as OidcRegisteredService;
    return {
      clientId: oidc.clientId,
      clientSecret: oidc.clientSecret,
      bypassApprovalPrompt: oidc.bypassApprovalPrompt,
      generateRefreshToken: oidc.generateRefreshToken,
      jwks: oidc.jwks,
      scopes_userdefined: oidc.scopes_userdefined,
      signIdToken: oidc.signIdToken,
      implicit: oidc.implicit,
      encryptIdToken: oidc.encryptIdToken,
      idTokenEncryptionAlg: oidc.idTokenEncryptionAlg,
      idTokenEncryptionEncoding: oidc.idTokenEncryptionEncoding,
      subjectType: oidc.subjectType,
      sectorIdentifierUri: oidc.sectorIdentifierUri,
      dynamicRegistrationDateTime: oidc.dynamicRegistrationDateTime
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OidcRegisteredService = service as OidcRegisteredService;
    const frm = this.form.value;
    srv.clientId =  frm.clientId;
    srv.clientSecret = frm.clientSecret;
    srv.bypassApprovalPrompt = frm.bypassApprovalPrompt;
    srv.generateRefreshToken = frm.generateRefreshToken;
    srv.jwks = frm.jwks;
    srv.scopes_userdefined = frm.scopes_userdefined;
    srv.signIdToken = frm.signIdToken;
    srv.implicit = frm.implicit;
    srv.encryptIdToken = frm.encryptIdToken;
    srv.idTokenEncryptionAlg = frm.idTokenEncryptionAlg;
    srv.idTokenEncryptionEncoding = frm.idTokenEncryptionEncoding;
    srv.subjectType = frm.subjectType;
    srv.sectorIdentifierUri = frm.sectorIdentifierUri;
    srv.dynamicRegistrationDateTime = frm.oidc.dynamicRegistrationDateTime;
  }
}
