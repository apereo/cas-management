import {Component} from '@angular/core';
import {FormService, ServiceForm} from '@apereo/mgmt-lib/src/lib/form';
import {TabLogoutForm} from './tab-logout.form';

/**
 * Component to display/update logout options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-logout',
  templateUrl: './tab-logout.component.html'
})
export class TabLogoutComponent {

  readonly key = 'logout';
  get tab() { return this.service.form.get(this.key) as TabLogoutForm; }
  set tab(f: TabLogoutForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabLogoutForm(service.registeredService);
    }
  }
}
