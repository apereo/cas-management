import {Component} from '@angular/core';
import {OidcRegisteredService} from 'domain-lib';
import {OidcAttrForm} from './oidc-attr-form';
import {DataRecord} from 'mgmt-lib';

@Component({
  selector: 'app-tab-oidc-attrrelease',
  templateUrl: './tab-oidc-attrrelase.component.html'
})
export class TabOidcAttrreleaseComponent {
  oidcService: OidcRegisteredService;
  oidcForm: OidcAttrForm;

  constructor(public data: DataRecord) {
    this.oidcService = this.data.service as OidcRegisteredService;
    if (this.data.formMap.has('attributeRelease')) {
      this.oidcForm = this.data.formMap.get('attributeRelease') as OidcAttrForm;
      return;
    }
    this.oidcForm = new OidcAttrForm(this.oidcService);
    this.data.formMap.set('attributeRelease', this.oidcForm);
  }
}
