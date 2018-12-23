import {Component} from '@angular/core';
import {ExpirationForm} from './expiration-form';
import {DataRecord} from 'mgmt-lib';

@Component({
  selector: 'app-tab-expiration',
  templateUrl: './tab-expiration.component.html'
})
export class TabExpirationComponent {

  expiration: ExpirationForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('expiration')) {
      this.expiration = this.data.formMap.get('expiration') as ExpirationForm;
      return;
    }
    this.expiration = new ExpirationForm(this.data.service);
    this.data.formMap.set('expiration', this.expiration);
  }

}
