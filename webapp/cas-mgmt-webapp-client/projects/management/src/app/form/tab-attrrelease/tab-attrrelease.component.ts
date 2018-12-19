import {Component} from '@angular/core';
import {ReleaseForm} from './release-form';
import {
  OidcRegisteredService,
  WSFederationRegisterdService,
  DataRecord,
} from 'mgmt-lib';
import {ReleasePolicyType} from 'mgmt-lib';
import {OidcAttrForm} from './policy/oidc-attr-form';

@Component({
  selector: 'app-tab-attrrelease',
  templateUrl: './tab-attrrelease.component.html'
})
export class TabAttrreleaseComponent {
  isOidc: boolean;
  isWsFed: boolean;
  oidcService: OidcRegisteredService;
  oidcForm: OidcAttrForm;
  attributeRelease: ReleaseForm;

  TYPE = ReleasePolicyType;

  constructor(public data: DataRecord) {
   this.isOidc = OidcRegisteredService.instanceOf(this.data.service);
   this.isWsFed = WSFederationRegisterdService.instanceOf(this.data.service);
   if (this.isOidc) {
     this.oidcService = this.data.service as OidcRegisteredService;
     if (this.data.formMap.has('attributeRelease')) {
       this.oidcForm = this.data.formMap.get('attributeRelease') as OidcAttrForm;
       return;
     }
     this.oidcForm = new OidcAttrForm(this.oidcService);
     this.data.formMap.set('attributeRelease', this.oidcForm);
     return;
   }
   if (this.data.formMap.has('attributeRelease')) {
     this.attributeRelease = this.data.formMap.get('attributeRelease') as ReleaseForm;
     return;
   }
   this.attributeRelease = new ReleaseForm(this.data.service.attributeReleasePolicy, this.isWsFed);
   this.data.formMap.set('attributeRelease', this.attributeRelease);
  }
}
