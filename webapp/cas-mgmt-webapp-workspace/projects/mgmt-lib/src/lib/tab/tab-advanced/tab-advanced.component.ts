import {Component} from '@angular/core';
import {TabAdvancedForm} from './tab-advanced.form';
import {FormService, ServiceForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update advanced options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-advanced',
  templateUrl: './tab-advanced.component.html'
})
export class TabAdvancedComponent {

  readonly key = 'advanced';
  get tab() { return this.service.form.get(this.key) as TabAdvancedForm; }
  set tab(f: TabAdvancedForm) { this.service.form.addControl(this.key, f); }

  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabAdvancedForm(service.registeredService);
    }
  }
}
