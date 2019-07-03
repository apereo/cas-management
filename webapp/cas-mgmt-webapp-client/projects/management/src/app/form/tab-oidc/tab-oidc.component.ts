import {Component} from '@angular/core';
import {DataRecord, OidcRegisteredService} from 'mgmt-lib';
import {OidcForm} from './oidc-form';
import {AppService} from '@app/core/app.service';
import {CodeExpirationForm} from '@app/form/tab-oauth/code-expiration-form';
import {AccessTokenExpirationForm} from '@app/form/tab-oauth/access-token-expiration-form';
import {RefreshTokenExpirationForm} from '@app/form/tab-oauth/refresh-token-expiration-form';
import {DeviceTokenExpirationForm} from '@app/form/tab-oauth/device-token-expiration-form';

@Component({
  selector: 'app-tab-oidc',
  templateUrl: './tab-oidc.component.html'
})
export class TabOIDCComponent {

  oidc: OidcForm;
  codeExpiration: CodeExpirationForm;
  accessTokenExpiration: AccessTokenExpirationForm;
  refreshTokenExpiration: RefreshTokenExpirationForm;
  deviceTokenExpiration: DeviceTokenExpirationForm;

  constructor(public data: DataRecord, public service: AppService) {
    if (this.data.formMap.has('oidc')) {
      this.oidc = this.data.formMap.get('oidc') as OidcForm;
      this.codeExpiration = this.oidc.get('codeExpirationPolicy') as CodeExpirationForm;
      this.accessTokenExpiration = this.oidc.get('accessTokenExpirationPolicy') as AccessTokenExpirationForm;
      this.refreshTokenExpiration = this.oidc.get('refreshTokenExpirationPolicy') as RefreshTokenExpirationForm;
      this.deviceTokenExpiration = this.oidc.get('deviceTokenExpirationPolicy') as DeviceTokenExpirationForm;
      return;
    }
    this.oidc = new OidcForm(this.data.service as OidcRegisteredService);
    this.codeExpiration = this.oidc.get('codeExpirationPolicy') as CodeExpirationForm;
    this.accessTokenExpiration = this.oidc.get('accessTokenExpirationPolicy') as AccessTokenExpirationForm;
    this.refreshTokenExpiration = this.oidc.get('refreshTokenExpirationPolicy') as RefreshTokenExpirationForm;
    this.deviceTokenExpiration = this.oidc.get('deviceTokenExpirationPolicy') as DeviceTokenExpirationForm;
    this.data.formMap.set('oidc', this.oidc);
  }

  generateId() {
    this.service.generateRandom().subscribe(id => {
      const control = this.oidc.get('clientId');
      control.setValue(id);
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  generateSecret() {
    this.service.generateRandom().subscribe(secret => {
      const control = this.oidc.get('clientSecret');
      control.setValue(secret);
      control.markAsTouched();
      control.markAsDirty();
    });
  }

}
