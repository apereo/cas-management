import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import { TabAcceptableUsagePolicyForm } from './tab-acceptable-usage-policy.form';

/**
 * Component to display/update basic options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-acceptable-usage-policy',
  templateUrl: './tab-acceptable-usage-policy.component.html'
})
export class TabAcceptableUsagePolicyComponent {

  readonly key = 'acceptableUsagePolicy';
  get tab() { return this.service.form.get(this.key) as TabAcceptableUsagePolicyForm; }
  set tab(f: TabAcceptableUsagePolicyForm) { this.service.form.addControl(this.key, f); }

  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabAcceptableUsagePolicyForm(service.registeredService);
    }
  }
}
