import {Component} from '@angular/core';
import {DataRecord, OidcRegisteredService} from 'mgmt-lib';
import {OidcForm} from './oidc-form';
import {AppService} from '@app/core/app.service';

@Component({
  selector: 'app-tab-oidc',
  templateUrl: './tab-oidc.component.html'
})
export class TabOIDCComponent {

  oidc: OidcForm;

  constructor(public data: DataRecord, public service: AppService) {
    if (this.data.formMap.has('oidc')) {
      this.oidc = this.data.formMap.get('oidc') as OidcForm;
      return;
    }
    this.oidc = new OidcForm(this.data.service as OidcRegisteredService);
    this.data.formMap.set('oidc', this.oidc);
  }

  generateId() {
    this.service.generateRandom().subscribe(id => this.oidc.get('clientId').setValue(id));
  }

  generateSecret() {
    this.service.generateRandom().subscribe(secret => this.oidc.get('clientSecret').setValue(secret));
  }

}
