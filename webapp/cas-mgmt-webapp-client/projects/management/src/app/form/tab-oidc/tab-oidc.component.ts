import {Component} from '@angular/core';
import {DataRecord, OidcRegisteredService} from 'mgmt-lib';
import {OidcForm} from './oidc-form';
import {OAuthService} from '@app/core/oauth.service';

@Component({
  selector: 'app-tab-oidc',
  templateUrl: './tab-oidc.component.html'
})
export class TabOIDCComponent {

  oidc: OidcForm;

  constructor(public data: DataRecord, public service: OAuthService) {
    if (this.data.formMap.has('oidc')) {
      this.oidc = this.data.formMap.get('oidc') as OidcForm;
      return;
    }
    this.oidc = new OidcForm(this.data.service as OidcRegisteredService);
    this.data.formMap.set('oidc', this.oidc);
  }

  generateId() {
    this.service.generateId().subscribe(id => this.oidc.get('clientId').setValue(id));
  }

  generateSecret() {
    this.service.generateSecret().subscribe(secret => this.oidc.get('clientSecret').setValue(secret));
  }

}
