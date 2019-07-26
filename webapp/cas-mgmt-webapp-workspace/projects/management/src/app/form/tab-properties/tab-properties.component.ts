import {Component} from '@angular/core';
import {DataRecord, FormDataService} from 'mgmt-lib';
import {PropertiesForm} from './properties-form';

@Component({
  selector: 'app-tab-properties',
  templateUrl: './tab-properties.component.html'
})
export class TabPropertiesComponent {

  properties: PropertiesForm;

  constructor(public data: DataRecord,
              public formData: FormDataService) {
    if (this.data.formMap.has('properties')) {
      this.properties = this.data.formMap.get('properties') as PropertiesForm;
      return;
    }
    this.properties = new PropertiesForm(this.data.service);
    this.data.formMap.set('properties', this.properties);
  }
}
