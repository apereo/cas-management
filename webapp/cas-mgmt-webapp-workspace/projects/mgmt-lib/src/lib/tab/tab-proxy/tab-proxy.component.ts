import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {TabProxyForm} from './tab-proxy-form';

/**
 * Component to display/update Proxy policies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-proxy',
  templateUrl: './tab-proxy.component.html'
})
export class TabProxyComponent {

  readonly key = 'proxy';
  get tab() { return this.service.form.get(this.key) as TabProxyForm; }
  set tab(f: TabProxyForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabProxyForm(service.registeredService.proxyPolicy);
    }
  }
}
