import {Component} from '@angular/core';
import {DataRecord, OAuthRegisteredService} from 'mgmt-lib';
import {OauthForm} from './oauth-form';
import {CodeExpirationForm} from '@app/form/tab-oauth/code-expiration-form';
import {AccessTokenExpirationForm} from '@app/form/tab-oauth/access-token-expiration-form';
import {RefreshTokenExpirationForm} from '@app/form/tab-oauth/refresh-token-expiration-form';
import {DeviceTokenExpirationForm} from '@app/form/tab-oauth/device-token-expiration-form';
import {AppService} from '@app/core/app.service';

@Component({
  selector: 'app-tab-oauth',
  templateUrl: './tab-oauth.component.html'
})
export class TabOauthComponent {

  oauth: OauthForm;
  codeExpiration: CodeExpirationForm;
  accessTokenExpiration: AccessTokenExpirationForm;
  refreshTokenExpiration: RefreshTokenExpirationForm;
  deviceTokenExpiration: DeviceTokenExpirationForm;

  constructor(public data: DataRecord, public service: AppService) {
    if (this.data.formMap.has('oauth')) {
      this.oauth = this.data.formMap.get('oauth') as OauthForm;
      this.codeExpiration = this.oauth.get('codeExpirationPolicy') as CodeExpirationForm;
      this.accessTokenExpiration = this.oauth.get('accessTokenExpirationPolicy') as AccessTokenExpirationForm;
      this.refreshTokenExpiration = this.oauth.get('refreshTokenExpirationPolicy') as RefreshTokenExpirationForm;
      this.deviceTokenExpiration = this.oauth.get('deviceTokenExpirationPolicy') as DeviceTokenExpirationForm;
      return;
    }
    this.oauth = new OauthForm(this.data.service as OAuthRegisteredService);
    this.codeExpiration = this.oauth.get('codeExpirationPolicy') as CodeExpirationForm;
    this.accessTokenExpiration = this.oauth.get('accessTokenExpirationPolicy') as AccessTokenExpirationForm;
    this.refreshTokenExpiration = this.oauth.get('refreshTokenExpirationPolicy') as RefreshTokenExpirationForm;
    this.deviceTokenExpiration = this.oauth.get('deviceTokenExpirationPolicy') as DeviceTokenExpirationForm;
    this.data.formMap.set('oauth', this.oauth);
  }

  generateId() {
    this.service.generateRandom().subscribe(id => {
      const control = this.oauth.get('clientId');
      control.setValue(id);
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  generateSecret() {
    this.service.generateRandom().subscribe(secret => {
      const control = this.oauth.get('clientSecret');
      control.setValue(secret);
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
