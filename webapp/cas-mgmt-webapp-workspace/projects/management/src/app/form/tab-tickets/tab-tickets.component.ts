import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {TabTicketsForm} from './tab-tickets.form';

@Component({
  selector: 'app-tab-tickets',
  templateUrl: './tab-tickets.component.html',
  styleUrls: ['./tab-tickets.component.css']
})
export class TabTicketsComponent {

  form: TabTicketsForm;
  readonly key = 'tickets';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabTicketsForm;
      return;
    }
    this.form = new TabTicketsForm(this.data.service);
    this.data.formMap.set(this.key, this.form);
  }

}
