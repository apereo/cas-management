import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {WsfedForm} from './wsfed-form';

@Component({
  selector: 'app-tab-wsfed',
  templateUrl: './tab-wsfed.component.html',
  styleUrls: ['./tab-wsfed.component.css']
})
export class TabWsfedComponent {

  wsfed: WsfedForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('wsfed')) {
      this.wsfed = this.data.formMap.get('wsfed') as WsfedForm;
      return;
    }
    this.wsfed = new WsfedForm(this.data);
    this.data.formMap.set('wsfed', this.wsfed);
  }
}
