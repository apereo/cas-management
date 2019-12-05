import {Component} from '@angular/core';
import {TabReleaseForm} from './tab-attrrelease.form';
import {
  DataRecord,
} from 'mgmt-lib';
import {ReleasePolicyType} from 'domain-lib';

@Component({
  selector: 'app-tab-attrrelease',
  templateUrl: './tab-attrrelease.component.html'
})
export class TabAttrreleaseComponent {

  form: TabReleaseForm;
  readonly key = 'attributeRelease';

  TYPE = ReleasePolicyType;

  constructor(public data: DataRecord) {
   if (this.data.formMap.has(this.key)) {
     this.form = this.data.formMap.get(this.key) as TabReleaseForm;
     return;
   }
   this.form = new TabReleaseForm(this.data.service.attributeReleasePolicy);
   this.data.formMap.set(this.key, this.form);
  }
}
