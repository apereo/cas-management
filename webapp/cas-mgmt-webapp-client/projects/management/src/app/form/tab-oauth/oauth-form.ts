import {Validators, FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  OAuthRegisteredService,
  MgmtFormControl,
  AbstractRegisteredService
} from 'mgmt-lib';
import {CodeExpirationForm} from '@app/form/tab-oauth/code-expiration-form';
import {AccessTokenExpirationForm} from '@app/form/tab-oauth/access-token-expiration-form';
import {RefreshTokenExpirationForm} from '@app/form/tab-oauth/refresh-token-expiration-form';
import {DeviceTokenExpirationForm} from '@app/form/tab-oauth/device-token-expiration-form';

export class OauthForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: OAuthRegisteredService) {
    super({
      clientId: new MgmtFormControl(null, null, Validators.required),
      clientSecret: new MgmtFormControl(null, null, Validators.required),
      bypassApprovalPrompt: new MgmtFormControl(null),
      generateRefreshToken: new MgmtFormControl(null),
      responseTypes: new MgmtFormControl(null),
      grantTypes: new MgmtFormControl(null),
      jwtAccessToken: new MgmtFormControl(null),
      codeExpirationPolicy: new CodeExpirationForm(service.codeExpirationPolicy),
      accessTokenExpirationPolicy: new AccessTokenExpirationForm(service.accessTokenExpirationPolicy),
      refreshTokenExpirationPolicy: new RefreshTokenExpirationForm(service.refreshTokenExpirationPolicy),
      deviceTokenExpirationPolicy: new DeviceTokenExpirationForm(service.deviceTokenExpirationPolicy)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      clientId: this.service.clientId,
      clientSecret: this.service.clientSecret,
      bypassApprovalPrompt: this.service.bypassApprovalPrompt,
      generateRefreshToken: this.service.generateRefreshToken,
      responseTypes: this.service.supportedResponseTypes,
      grantTypes: this.service.supportedGrantTypes,
      jwtAccessToken: this.service.jwtAccessToken,
      codeExpirationPolicy: (<CodeExpirationForm>this.get('codeExpirationPolicy')).formMap(),
      accessTokenExpirationPolicy: (<AccessTokenExpirationForm>this.get('accessTokenExpirationPolicy')).formMap(),
      refreshTokenExpirationPolicy: (<RefreshTokenExpirationForm>this.get('refreshTokenExpirationPolicy')).formMap(),
      deviceTokenExpirationPolicy: (<DeviceTokenExpirationForm>this.get('deviceTokenExpirationPolicy')).formMap()
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OAuthRegisteredService = service as OAuthRegisteredService;
    const frm = this.value;
    srv.generateRefreshToken = frm.generateRefreshToken;
    srv.bypassApprovalPrompt = frm.bypassApprovalPrompt;
    srv.clientSecret = frm.clientSecret;
    srv.clientId = frm.clientId;
    srv.supportedResponseTypes = frm.responseTypes;
    srv.supportedGrantTypes = frm.grantTypes;
    srv.jwtAccessToken = frm.jwtAccessToken;
    (<CodeExpirationForm>this.get('codeExpirationPolicy')).mapForm(srv.codeExpirationPolicy);
    (<AccessTokenExpirationForm>this.get('accessTokenExpirationPolicy')).mapForm(srv.accessTokenExpirationPolicy);
    (<RefreshTokenExpirationForm>this.get('refreshTokenExpirationPolicy')).mapForm(srv.refreshTokenExpirationPolicy);
    (<DeviceTokenExpirationForm>this.get('deviceTokenExpirationPolicy')).mapForm(srv.deviceTokenExpirationPolicy);
  }
}
