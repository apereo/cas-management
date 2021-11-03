import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {TabWsfedForm} from './tab-wsfed.form';
import {WSFederationRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Component to display/update WS Fed options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-wsfed',
  templateUrl: './tab-wsfed.component.html'
})
export class TabWsfedComponent {

  readonly key = 'wsfed';
  get tab() { return this.service.form.get(this.key) as TabWsfedForm; }
  set tab(f: TabWsfedForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabWsfedForm(service.registeredService as WSFederationRegisteredService);
    }
  }
}
