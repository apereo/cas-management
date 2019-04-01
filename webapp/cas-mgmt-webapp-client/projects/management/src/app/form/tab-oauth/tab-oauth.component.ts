import {Component} from '@angular/core';
import {DataRecord, OAuthRegisteredService} from 'mgmt-lib';
import {OauthForm} from './oauth-form';
import {OAuthService} from '@app/core/oauth.service';

@Component({
  selector: 'app-tab-oauth',
  templateUrl: './tab-oauth.component.html'
})
export class TabOauthComponent {

  oauth: OauthForm;

  constructor(public data: DataRecord, public service: OAuthService) {
    if (this.data.formMap.has('oauth')) {
      this.oauth = this.data.formMap.get('oauth') as OauthForm;
      return;
    }
    this.oauth = new OauthForm(this.data.service as OAuthRegisteredService);
    this.data.formMap.set('oauth', this.oauth);
  }

  generateId() {
    this.service.generateId().subscribe(id => this.oauth.get('clientId').setValue(id));
  }

  generateSecret() {
    this.service.generateSecret().subscribe(secret => this.oauth.get('clientSecret').setValue(secret));
  }
}
