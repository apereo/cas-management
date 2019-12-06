import {Component} from '@angular/core';
import {OidcRegisteredService} from 'domain-lib';
import {TabOidcAttrForm} from './tab-oidc-attrrelease.form';
import {DataRecord} from 'mgmt-lib';

@Component({
  selector: 'app-tab-oidc-attrrelease',
  templateUrl: './tab-oidc-attrrelease.component.html'
})
export class TabOidcAttrreleaseComponent {

  form: TabOidcAttrForm;
  readonly key = 'oidc-scopes';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabOidcAttrForm;
      return;
    }
    this.form = new TabOidcAttrForm(this.data.service as OidcRegisteredService);
    this.data.formMap.set(this.key, this.form);
  }
}
