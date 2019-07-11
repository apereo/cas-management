import {Component} from '@angular/core';
import {WsFedReleaseForm} from '@app/form/tab-wsfed-attrrelease/wsfed-form';
import {WsFederationClaimsReleasePolicy, DataRecord} from 'mgmt-lib';

@Component({
  selector: 'app-tab-wsfed-attrrelease',
  templateUrl: './tab-wsfed-attrrelease.component.html'
})
export class TabWsfedAttrreleaseComponent {

  wsFedForm: WsFedReleaseForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('attributeRelease')) {
      this.wsFedForm = this.data.formMap.get('attributeRelease') as WsFedReleaseForm;
      return;
    }
    this.wsFedForm = new WsFedReleaseForm(this.data.service.attributeReleasePolicy as WsFederationClaimsReleasePolicy);
    this.data.formMap.set('attributeRelease', this.wsFedForm);
  }
}
