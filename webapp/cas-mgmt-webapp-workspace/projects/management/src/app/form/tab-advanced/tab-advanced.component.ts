import {Component, OnInit} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {AdvancedForm} from './advanced-form';

@Component({
  selector: 'app-tab-advanced',
  templateUrl: './tab-advanced.component.html'
})
export class TabAdvancedComponent implements OnInit {

  advanced: AdvancedForm;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    if (this.data.formMap.has('advanced')) {
      this.advanced = this.data.formMap.get('advanced') as AdvancedForm;
      return;
    }
    this.advanced = new AdvancedForm(this.data.service);
    this.data.formMap.set('advanced', this.advanced);
  }

}
