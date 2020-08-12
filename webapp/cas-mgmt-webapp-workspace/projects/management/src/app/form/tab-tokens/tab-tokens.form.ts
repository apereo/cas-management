import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, OAuthRegisteredService} from 'domain-lib';
import {AccessTokenExpirationForm, CodeExpirationForm, DeviceTokenExpirationForm, MgmtFormGroup, RefreshTokenExpirationForm} from 'mgmt-lib';

export class TabTokenForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get code() { return this.get('codeExpirationPolicy') as CodeExpirationForm; }
  get accessToken() { return this.get('accessTokenExpirationPolicy') as AccessTokenExpirationForm; }
  get refreshToken() { return this.get('refreshTokenExpirationPolicy') as RefreshTokenExpirationForm; }
  get deviceToken() { return this.get('deviceTokenExpirationPolicy') as DeviceTokenExpirationForm; }

  constructor(public service: OAuthRegisteredService) {
    super({
      codeExpirationPolicy: new CodeExpirationForm(service?.codeExpirationPolicy),
      accessTokenExpirationPolicy: new AccessTokenExpirationForm(service?.accessTokenExpirationPolicy),
      refreshTokenExpirationPolicy: new RefreshTokenExpirationForm(service?.refreshTokenExpirationPolicy),
      deviceTokenExpirationPolicy: new DeviceTokenExpirationForm(service?.deviceTokenExpirationPolicy)
    });
  }

  formMap(): any {
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OAuthRegisteredService = service as OAuthRegisteredService;
    srv.codeExpirationPolicy = this.code.mapForm();
    srv.accessTokenExpirationPolicy = this.accessToken.mapForm();
    srv.refreshTokenExpirationPolicy = this.refreshToken.mapForm();
    srv.deviceTokenExpirationPolicy = this.deviceToken.mapForm();
  }
}
