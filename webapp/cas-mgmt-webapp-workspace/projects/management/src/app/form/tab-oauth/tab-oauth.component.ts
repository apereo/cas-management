import {Component} from '@angular/core';
import {OAuthRegisteredService} from 'domain-lib';
import {AppConfigService} from 'shared-lib';
import {DataRecord, OauthClientForm} from 'mgmt-lib';

@Component({
  selector: 'app-tab-oauth',
  templateUrl: './tab-oauth.component.html'
})
export class TabOauthComponent {

  form: OauthClientForm;

  constructor(public data: DataRecord, public service: AppConfigService) {
    if (this.data.formMap.has('oauth')) {
      this.form = this.data.formMap.get('oauth') as OauthClientForm;
      return;
    }
    this.form = new OauthClientForm(this.data.service as OAuthRegisteredService);
    this.data.formMap.set('oauth', this.form);
  }

  generateId() {
    this.service.getRandom().subscribe(id => {
      const control = this.form.get('clientId');
      control.setValue(id);
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  generateSecret() {
    this.service.getRandom().subscribe(secret => {
      const control = this.form.get('clientSecret');
      control.setValue(secret);
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}
