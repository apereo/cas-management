import {FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  OAuthRegisteredService,
  MgmtFormControl,
  AbstractRegisteredService
} from 'mgmt-lib';

export class OauthForm extends MgmtFormGroup {

  constructor(public data: DataRecord) {
    super();
    this.form = new FormGroup({
      clientId: new MgmtFormControl(null, null, Validators.required),
      clientSecret: new MgmtFormControl(null, null, Validators.required),
      bypassApprovalPrompt: new MgmtFormControl(null),
      generateRefreshToken: new MgmtFormControl(null),
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    const oauth: OAuthRegisteredService = this.data.service as OAuthRegisteredService;
    return {
      clientId: oauth.clientId,
      clientSecret: oauth.clientSecret,
      bypassApprovalPrompt: oauth.bypassApprovalPrompt,
      generateRefreshToken: oauth.generateRefreshToken,
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OAuthRegisteredService = service as OAuthRegisteredService;
    const frm = this.form.value;
    srv.generateRefreshToken = frm.generateRefreshToken;
    srv.bypassApprovalPrompt = frm.bypassApprovalPrompt;
    srv.clientSecret = frm.clientSecret;
    srv.clientId = frm.clientId;
  }
}
