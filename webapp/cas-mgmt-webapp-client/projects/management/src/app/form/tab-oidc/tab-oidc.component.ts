import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {OidcForm} from './oidc-form';

@Component({
  selector: 'app-tab-oidc',
  templateUrl: './tab-oidc.component.html',
  styleUrls: ['./tab-oidc.component.css']
})
export class TabOIDCComponent {

  oidc: OidcForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('oidc')) {
      this.oidc = this.data.formMap.get('oidc') as OidcForm;
      return;
    }
    this.oidc = new OidcForm(this.data);
    this.data.formMap.set('oidc', this.oidc);
  }
}
