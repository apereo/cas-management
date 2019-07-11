import {Component} from '@angular/core';
import {OidcRegisteredService, DataRecord} from 'mgmt-lib';
import {OidcAttrForm} from '@app/form/tab-oidc-attrrelease/oidc-attr-form';

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
