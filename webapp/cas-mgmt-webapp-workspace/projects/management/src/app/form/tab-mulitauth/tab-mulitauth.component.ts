import {Component} from '@angular/core';
import {TabMultiauthForm} from './tab-multiauth.form';
import {
  DataRecord,
} from 'mgmt-lib';

@Component({
  selector: 'app-tab-mulitauth',
  templateUrl: './tab-mulitauth.component.html'
})
export class TabMulitauthComponent {

  form: TabMultiauthForm;
  readonly key = 'multiauth';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabMultiauthForm;
      return;
    }
    this.form = new TabMultiauthForm(this.data.service.multifactorPolicy);
    this.data.formMap.set(this.key, this.form);
  }
}
