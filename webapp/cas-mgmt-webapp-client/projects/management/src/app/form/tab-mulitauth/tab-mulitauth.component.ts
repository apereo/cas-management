import {Component} from '@angular/core';
import {MultiauthForm} from './multiauth-form';
import {
  DataRecord,
} from 'mgmt-lib';

@Component({
  selector: 'app-tab-mulitauth',
  templateUrl: './tab-mulitauth.component.html'
})
export class TabMulitauthComponent {

  mfa: MultiauthForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('multiauth')) {
      this.mfa = this.data.formMap.get('multiauth') as MultiauthForm;
      return;
    }
    this.mfa = new MultiauthForm(this.data.service.multifactorPolicy);
    this.data.formMap.set('multiauth', this.mfa);
  }
}
