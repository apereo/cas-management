import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {TabProxyForm} from './tab-proxy-form';

@Component({
  selector: 'app-tab-proxy',
  templateUrl: './tab-proxy.component.html'
})
export class TabProxyComponent {

  form: TabProxyForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('proxy')) {
      this.form = this.data.formMap.get('proxy') as TabProxyForm;
      return;
    }
    this.form = new TabProxyForm(this.data.service.proxyPolicy);
    this.data.formMap.set('proxy', this.form);
  }
}
