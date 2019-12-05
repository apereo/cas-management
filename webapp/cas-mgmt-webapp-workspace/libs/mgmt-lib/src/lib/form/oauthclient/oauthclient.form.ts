import {FormGroup, Validators} from '@angular/forms';
import {OAuthRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {MgmtFormGroup} from '../mgmt-form-group';

export class OauthClientForm extends FormGroup implements MgmtFormGroup<OAuthRegisteredService> {

  get clientId() {return this.get('clientId') as MgmtFormControl; }
  get clientSecret() { return this.get('clientSecret') as MgmtFormControl; }
  get bypassApprovalPrompt() { return this.get('bypassApprovalPrompt') as MgmtFormControl; }
  get generateRefreshToken() { return this.get('generateRefreshToken') as MgmtFormControl; }
  get responseTypes() { return this.get('responseTypes') as MgmtFormControl; }
  get grantTypes() { return this.get('grantTypes') as MgmtFormControl; }
  get jwtAccessToken() { return this.get('jwtAccessToken') as MgmtFormControl; }

  constructor(service: OAuthRegisteredService) {
    super({
      clientId: new MgmtFormControl(service && service.clientId, null, Validators.required),
      clientSecret: new MgmtFormControl(service && service.clientSecret, null, Validators.required),
      bypassApprovalPrompt: new MgmtFormControl(service && service.bypassApprovalPrompt),
      generateRefreshToken: new MgmtFormControl(service && service.generateRefreshToken),
      responseTypes: new MgmtFormControl(service && service.responseType),
      grantTypes: new MgmtFormControl(service && service.supportedGrantTypes),
      jwtAccessToken: new MgmtFormControl(service && service.jwtAccessToken)
    });
  }

  formMap(): any {
  }

  mapForm(service: OAuthRegisteredService) {
    service.clientId = this.clientId.value;
    service.clientSecret = this.clientSecret.value;
    service.bypassApprovalPrompt = this.bypassApprovalPrompt.value;
    service.generateRefreshToken = this.generateRefreshToken.value;
    service.supportedResponseTypes = this.responseTypes.value;
    service.supportedGrantTypes = this.grantTypes.value;
    service.jwtAccessToken = this.jwtAccessToken.value;
  }
}
