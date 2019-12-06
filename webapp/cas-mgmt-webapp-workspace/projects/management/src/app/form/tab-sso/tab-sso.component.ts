import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {TabSsoForm} from './tab-sso.form';

@Component({
  selector: 'app-tab-sso',
  templateUrl: './tab-sso.component.html',
  styleUrls: ['./tab-sso.component.css']
})
export class TabSsoComponent {

  form: TabSsoForm;
  readonly key = 'ssoPolicy';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabSsoForm;
      return;
    }
    this.form = new TabSsoForm(this.data.service);
    this.data.formMap.set(this.key, this.form);
  }

}
