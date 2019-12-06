import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {TabWsfedForm} from './tab-wsfed.form';
import {WSFederationRegisterdService} from 'domain-lib';

@Component({
  selector: 'app-tab-wsfed',
  templateUrl: './tab-wsfed.component.html'
})
export class TabWsfedComponent {

  form: TabWsfedForm;
  readonly key = 'wsfed';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabWsfedForm;
      return;
    }
    this.form = new TabWsfedForm(this.data.service as WSFederationRegisterdService);
    this.data.formMap.set(this.key, this.form);
  }
}
