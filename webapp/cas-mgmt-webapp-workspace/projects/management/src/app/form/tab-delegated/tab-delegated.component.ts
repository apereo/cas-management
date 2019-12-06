import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {TabDelegatedForm} from './tab-delegated.form';

@Component({
  selector: 'app-tab-delegated',
  templateUrl: './tab-delegated.component.html'
})
export class TabDelegatedComponent {

  form: TabDelegatedForm;
  readonly key = 'delegated';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabDelegatedForm;
      return;
    }
    this.form = new TabDelegatedForm(this.data.service);
    this.data.formMap.set(this.key, this.form);
  }

}
