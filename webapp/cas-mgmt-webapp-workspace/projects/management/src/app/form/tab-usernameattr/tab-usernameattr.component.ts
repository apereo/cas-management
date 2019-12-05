import {Component} from '@angular/core';
import {DataRecord, FormDataService} from 'mgmt-lib';
import {TabUsernameattrForm} from './tab-usernameattr.form';

@Component({
  selector: 'app-tab-usernameattr',
  templateUrl: './tab-usernameattr.component.html'
})
export class TabUsernameattrComponent {

  form: TabUsernameattrForm;
  readonly key = 'uidAttrs';

  constructor(public data: DataRecord, public formData: FormDataService) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabUsernameattrForm;
      return;
    }
    this.form = new TabUsernameattrForm(this.data.service.usernameAttributeProvider);
    this.data.formMap.set(this.key, this.form);
  }

  attributes(): string[] {
    return this.formData.availableAttributes(this.formData.options.attributeRepositories);
  }
}
