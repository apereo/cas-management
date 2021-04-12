import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {TabSsoForm} from './tab-sso.form';

/**
 * Component to display/update sso policies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-sso',
  templateUrl: './tab-sso.component.html',
  styleUrls: ['./tab-sso.component.css']
})
export class TabSsoComponent {

  readonly key = 'ssoPolicy';
  get tab() { return this.service.form.get(this.key) as TabSsoForm; }
  set tab(f: TabSsoForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabSsoForm(service.registeredService);
    }
  }

}
