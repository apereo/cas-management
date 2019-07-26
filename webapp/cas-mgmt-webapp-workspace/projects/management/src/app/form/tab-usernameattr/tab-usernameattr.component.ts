import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {UsernameattrForm} from './usernameattr-form';

@Component({
  selector: 'app-tab-usernameattr',
  templateUrl: './tab-usernameattr.component.html'
})
export class TabUsernameattrComponent {

  uidAttrs: UsernameattrForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('uidAttrs')) {
      this.uidAttrs = this.data.formMap.get('uidAttrs') as UsernameattrForm;
      return;
    }
    this.uidAttrs = new UsernameattrForm(this.data.service.usernameAttributeProvider);
    this.data.formMap.set('uidAttrs', this.uidAttrs);
  }
}
