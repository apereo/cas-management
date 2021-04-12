import { Component } from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {TabTicketsForm} from './tab-tickets.form';

/**
 * Component to display/update ticket expiration policies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-tickets',
  templateUrl: './tab-tickets.component.html',
  styleUrls: ['./tab-tickets.component.css']
})
export class TabTicketsComponent {

  readonly key = 'tickets';
  get tab() { return this.service.form.get(this.key) as TabTicketsForm; }
  set tab(f: TabTicketsForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabTicketsForm(service.registeredService);
    }
  }

}
