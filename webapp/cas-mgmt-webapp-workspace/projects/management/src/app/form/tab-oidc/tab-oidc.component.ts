import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {OidcRegisteredService} from 'domain-lib';
import {TabOidcForm} from './tab-oidc.form';
import {OAuthService} from '../../core/oauth.service';

@Component({
  selector: 'app-tab-oidc',
  templateUrl: './tab-oidc.component.html'
})
export class TabOIDCComponent {

  form: TabOidcForm;
  readonly key = 'oidc';

  constructor(public data: DataRecord, public service: OAuthService) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabOidcForm;
      return;
    }
    this.form = new TabOidcForm(this.data.service as OidcRegisteredService);
    this.data.formMap.set(this.key, this.form);
  }

}
