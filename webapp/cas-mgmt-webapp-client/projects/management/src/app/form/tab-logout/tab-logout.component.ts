import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {LogoutForm} from './logout-form';

@Component({
  selector: 'app-tab-logout',
  templateUrl: './tab-logout.component.html'
})
export class TabLogoutComponent {

  logout: LogoutForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('logout')) {
      this.logout = this.data.formMap.get('logout') as LogoutForm;
      return;
    }
    this.logout = new LogoutForm(this.data.service);
    this.data.formMap.set('logout', this.logout);
  }
}
