import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {TabLogoutForm} from './tab-logout.form';

@Component({
  selector: 'app-tab-logout',
  templateUrl: './tab-logout.component.html'
})
export class TabLogoutComponent {

  form: TabLogoutForm;
  readonly key = 'logout';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabLogoutForm;
      return;
    }
    this.form = new TabLogoutForm(this.data.service);
    this.data.formMap.set(this.key, this.form);
  }
}
