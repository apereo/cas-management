import { Component, OnInit } from '@angular/core';
import {OAuthRegisteredService} from 'domain-lib';
import {TokenForm} from './tokens-form';
import {CodeExpirationForm} from './code-expiration-form';
import {AccessTokenExpirationForm} from './access-token-expiration-form';
import {RefreshTokenExpirationForm} from './refresh-token-expiration-form';
import {DeviceTokenExpirationForm} from './device-token-expiration-form';
import {DataRecord} from 'mgmt-lib';

@Component({
  selector: 'app-tab-tokens',
  templateUrl: './tab-tokens.component.html',
  styleUrls: ['./tab-tokens.component.css']
})
export class TabTokensComponent implements OnInit {

  tokens: TokenForm;
  codeExpiration: CodeExpirationForm;
  accessTokenExpiration: AccessTokenExpirationForm;
  refreshTokenExpiration: RefreshTokenExpirationForm;
  deviceTokenExpiration: DeviceTokenExpirationForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('tokens')) {
      this.tokens = this.data.formMap.get('tokens') as TokenForm;
      this.codeExpiration = this.tokens.get('codeExpirationPolicy') as CodeExpirationForm;
      this.accessTokenExpiration = this.tokens.get('accessTokenExpirationPolicy') as AccessTokenExpirationForm;
      this.refreshTokenExpiration = this.tokens.get('refreshTokenExpirationPolicy') as RefreshTokenExpirationForm;
      this.deviceTokenExpiration = this.tokens.get('deviceTokenExpirationPolicy') as DeviceTokenExpirationForm;
      return;
    }
    this.tokens = new TokenForm(this.data.service as OAuthRegisteredService);
    this.codeExpiration = this.tokens.get('codeExpirationPolicy') as CodeExpirationForm;
    this.accessTokenExpiration = this.tokens.get('accessTokenExpirationPolicy') as AccessTokenExpirationForm;
    this.refreshTokenExpiration = this.tokens.get('refreshTokenExpirationPolicy') as RefreshTokenExpirationForm;
    this.deviceTokenExpiration = this.tokens.get('deviceTokenExpirationPolicy') as DeviceTokenExpirationForm;
    this.data.formMap.set('tokens', this.tokens);
  }

  ngOnInit() {

  }
}
