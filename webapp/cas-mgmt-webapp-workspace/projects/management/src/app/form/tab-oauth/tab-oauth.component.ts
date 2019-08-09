import {Component} from '@angular/core';
import {OAuthRegisteredService} from 'domain-lib';
import {OauthForm} from './oauth-form';
import {DataRecord} from 'mgmt-lib';
import {AppConfigService} from 'shared-lib';

@Component({
  selector: 'app-tab-oauth',
  templateUrl: './tab-oauth.component.html'
})
export class TabOauthComponent {

  oauth: OauthForm;

  constructor(public data: DataRecord, public service: AppConfigService) {
    if (this.data.formMap.has('oauth')) {
      this.oauth = this.data.formMap.get('oauth') as OauthForm;
      return;
    }
    this.oauth = new OauthForm(this.data.service as OAuthRegisteredService);
    this.data.formMap.set('oauth', this.oauth);
  }

  generateId() {
    this.service.getRandom().subscribe(id => {
      const control = this.oauth.get('clientId');
      control.setValue(id);
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  generateSecret() {
    this.service.getRandom().subscribe(secret => {
      const control = this.oauth.get('clientSecret');
      control.setValue(secret);
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
