import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SsoForm} from '@app/form/tab-sso/sso-form';

@Component({
  selector: 'app-tab-sso',
  templateUrl: './tab-sso.component.html',
  styleUrls: ['./tab-sso.component.css']
})
export class TabSsoComponent {

  ssoForm: SsoForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('ssoPolicy')) {
      this.ssoForm = this.data.formMap.get('ssoPolicy') as SsoForm;
      return;
    }
    this.ssoForm = new SsoForm(this.data.service);
    this.data.formMap.set('ssoPolicy', this.ssoForm);
  }

}
