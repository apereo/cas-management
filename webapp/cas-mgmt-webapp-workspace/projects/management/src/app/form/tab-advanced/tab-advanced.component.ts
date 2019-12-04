import {Component, OnInit} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {TabAdvancedForm} from './tab-advanced.form';

@Component({
  selector: 'app-tab-advanced',
  templateUrl: './tab-advanced.component.html'
})
export class TabAdvancedComponent implements OnInit {

  form: TabAdvancedForm;
  readonly key = 'advanced';

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabAdvancedForm;
      return;
    }
    this.form = new TabAdvancedForm(this.data.service);
    this.data.formMap.set(this.key, this.form);
  }

}
