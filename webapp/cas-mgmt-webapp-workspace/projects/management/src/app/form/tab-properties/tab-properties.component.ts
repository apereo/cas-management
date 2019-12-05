import {Component} from '@angular/core';
import {DataRecord, FormDataService} from 'mgmt-lib';
import {TabPropertiesForm} from './tab-properties.form';

@Component({
  selector: 'app-tab-properties',
  templateUrl: './tab-properties.component.html'
})
export class TabPropertiesComponent {

  form: TabPropertiesForm;
  readonly key = 'properties';

  constructor(public data: DataRecord,
              public formData: FormDataService) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabPropertiesForm;
      return;
    }
    this.form = new TabPropertiesForm(this.data.service);
    this.data.formMap.set(this.key, this.form);
  }
}
