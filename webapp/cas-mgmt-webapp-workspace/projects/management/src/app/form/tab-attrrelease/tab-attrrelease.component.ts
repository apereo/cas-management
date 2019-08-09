import {Component} from '@angular/core';
import {ReleaseForm} from './release-form';
import {
  DataRecord,
} from 'mgmt-lib';
import {ReleasePolicyType} from 'domain-lib';

@Component({
  selector: 'app-tab-attrrelease',
  templateUrl: './tab-attrrelease.component.html'
})
export class TabAttrreleaseComponent {
  attributeRelease: ReleaseForm;

  TYPE = ReleasePolicyType;

  constructor(public data: DataRecord) {
   if (this.data.formMap.has('attributeRelease')) {
     this.attributeRelease = this.data.formMap.get('attributeRelease') as ReleaseForm;
     return;
   }
   this.attributeRelease = new ReleaseForm(this.data.service.attributeReleasePolicy);
   this.data.formMap.set('attributeRelease', this.attributeRelease);
  }
}
