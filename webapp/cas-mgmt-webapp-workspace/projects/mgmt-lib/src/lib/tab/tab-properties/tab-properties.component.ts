import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {TabPropertiesForm} from './tab-properties.form';

/**
 * Component to display/update custom properties for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-properties',
  templateUrl: './tab-properties.component.html'
})
export class TabPropertiesComponent {

  readonly key = 'properties';
  get tab() { return this.service.form.get(this.key) as TabPropertiesForm; }
  set tab(f: TabPropertiesForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabPropertiesForm(service.registeredService);
    }
  }
}
