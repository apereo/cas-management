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
    if (this.data.formMap.has('mfa')) {
      this.mfa = this.data.formMap.get('mfa') as MultiauthForm;
      return;
    }
    this.mfa = new MultiauthForm(this.data.service.multifactorPolicy);
    this.data.formMap.set('mfa', this.mfa);
  }
}
