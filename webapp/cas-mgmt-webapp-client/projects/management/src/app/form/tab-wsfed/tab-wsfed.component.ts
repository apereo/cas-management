import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {WsfedForm} from './wsfed-form';
import {WSFederationRegisterdService} from 'domain-lib';

@Component({
  selector: 'app-tab-wsfed',
  templateUrl: './tab-wsfed.component.html'
})
export class TabWsfedComponent {

  wsfed: WsfedForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('wsfed')) {
      this.wsfed = this.data.formMap.get('wsfed') as WsfedForm;
      return;
    }
    this.wsfed = new WsfedForm(this.data.service as WSFederationRegisterdService);
    this.data.formMap.set('wsfed', this.wsfed);
  }
}
