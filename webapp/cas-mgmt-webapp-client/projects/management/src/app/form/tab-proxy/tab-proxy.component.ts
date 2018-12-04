import {Component} from '@angular/core';
import {DataRecord, ProxyType} from 'mgmt-lib';
import {ProxyForm} from './proxy-form';

@Component({
  selector: 'app-tab-proxy',
  templateUrl: './tab-proxy.component.html'
})
export class TabProxyComponent {

  proxy: ProxyForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('proxy')) {
      this.proxy = this.data.formMap.get('proxy') as ProxyForm;
      return;
    }
    this.proxy = new ProxyForm(this.data);
    this.proxy.get('type').valueChanges.subscribe(val => {
      if (val === ProxyType.REFUSE) {
        this.proxy.get('regex').setValue(null);
      }
    });
    this.data.formMap.set('proxy', this.proxy);
  }
}
