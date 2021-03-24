import {Component} from '@angular/core';
import {TabMultiauthForm} from './tab-multiauth.form';
import {FormService, ServiceForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update MFA options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-mulitauth',
  templateUrl: './tab-mulitauth.component.html'
})
export class TabMulitauthComponent {

  readonly key = 'multiauth';
  get tab() { return this.service.form.get(this.key) as TabMultiauthForm; }
  set tab(f: TabMultiauthForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabMultiauthForm(service.registeredService.multifactorPolicy);
    }
  }
}
