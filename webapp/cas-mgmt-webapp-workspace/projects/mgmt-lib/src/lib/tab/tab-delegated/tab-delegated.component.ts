import {Component} from '@angular/core';
import {FormService, ServiceForm} from '@apereo/mgmt-lib/src/lib/form';
import {TabDelegatedForm} from './tab-delegated.form';

/**
 * Component to display/update Delegated authentication options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-delegated',
  templateUrl: './tab-delegated.component.html'
})
export class TabDelegatedComponent {

  readonly key = 'delegated';
  get tab() { return this.service.form.get(this.key) as TabDelegatedForm; }
  set tab(f: TabDelegatedForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabDelegatedForm(service.registeredService);
    }
  }

}
