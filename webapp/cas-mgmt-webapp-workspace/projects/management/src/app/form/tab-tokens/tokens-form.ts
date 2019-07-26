import {FormGroup} from '@angular/forms';
import {OAuthRegisteredService, AbstractRegisteredService} from 'domain-lib';
import {MgmtFormGroup} from 'mgmt-lib';
import {CodeExpirationForm} from './code-expiration-form';
import {AccessTokenExpirationForm} from './access-token-expiration-form';
import {RefreshTokenExpirationForm} from './refresh-token-expiration-form';
import {DeviceTokenExpirationForm} from './device-token-expiration-form';

export class TokenForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: OAuthRegisteredService) {
    super({
      codeExpirationPolicy: new CodeExpirationForm(service.codeExpirationPolicy),
      accessTokenExpirationPolicy: new AccessTokenExpirationForm(service.accessTokenExpirationPolicy),
      refreshTokenExpirationPolicy: new RefreshTokenExpirationForm(service.refreshTokenExpirationPolicy),
      deviceTokenExpirationPolicy: new DeviceTokenExpirationForm(service.deviceTokenExpirationPolicy)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      codeExpirationPolicy: (<CodeExpirationForm>this.get('codeExpirationPolicy')).formMap(),
      accessTokenExpirationPolicy: (<AccessTokenExpirationForm>this.get('accessTokenExpirationPolicy')).formMap(),
      refreshTokenExpirationPolicy: (<RefreshTokenExpirationForm>this.get('refreshTokenExpirationPolicy')).formMap(),
      deviceTokenExpirationPolicy: (<DeviceTokenExpirationForm>this.get('deviceTokenExpirationPolicy')).formMap()
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: OAuthRegisteredService = service as OAuthRegisteredService;
    const frm = this.value;
    (<CodeExpirationForm>this.get('codeExpirationPolicy')).mapForm(srv.codeExpirationPolicy);
    (<AccessTokenExpirationForm>this.get('accessTokenExpirationPolicy')).mapForm(srv.accessTokenExpirationPolicy);
    (<RefreshTokenExpirationForm>this.get('refreshTokenExpirationPolicy')).mapForm(srv.refreshTokenExpirationPolicy);
    (<DeviceTokenExpirationForm>this.get('deviceTokenExpirationPolicy')).mapForm(srv.deviceTokenExpirationPolicy);
  }
}
