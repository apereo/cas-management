import {Validators, FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  OAuthRegisteredService,
  MgmtFormControl,
  AbstractRegisteredService
} from 'mgmt-lib';

export class OauthForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: OAuthRegisteredService) {
    super({
      clientId: new MgmtFormControl(null, null, Validators.required),
      clientSecret: new MgmtFormControl(null, null, Validators.required),
      bypassApprovalPrompt: new MgmtFormControl(null),
      generateRefreshToken: new MgmtFormControl(null),
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      clientId: this.service.clientId,
      clientSecret: this.service.clientSecret,
      bypassApprovalPrompt: this.service.bypassApprovalPrompt,
      generateRefreshToken: this.service.generateRefreshToken,
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OAuthRegisteredService = service as OAuthRegisteredService;
    const frm = this.value;
    srv.generateRefreshToken = frm.generateRefreshToken;
    srv.bypassApprovalPrompt = frm.bypassApprovalPrompt;
    srv.clientSecret = frm.clientSecret;
    srv.clientId = frm.clientId;
  }
}
