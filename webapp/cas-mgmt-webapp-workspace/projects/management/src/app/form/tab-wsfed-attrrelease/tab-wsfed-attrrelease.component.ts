import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {WsFederationClaimsReleasePolicy} from 'domain-lib';
import {TabWsFedReleaseForm} from './tab-wsfed-attrrelease.form';

@Component({
  selector: 'app-tab-wsfed-attrrelease',
  templateUrl: './tab-wsfed-attrrelease.component.html'
})
export class TabWsfedAttrreleaseComponent {

  form: TabWsFedReleaseForm;
  readonly key = 'wsfed-attrrelease';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabWsFedReleaseForm;
      return;
    }
    this.form = new TabWsFedReleaseForm(this.data.service.attributeReleasePolicy as WsFederationClaimsReleasePolicy);
    this.data.formMap.set(this.key, this.form);
  }
}
