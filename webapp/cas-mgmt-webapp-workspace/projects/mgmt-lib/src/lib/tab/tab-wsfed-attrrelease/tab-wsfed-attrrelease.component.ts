import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {WsFederationClaimsReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';
import {TabWsFedReleaseForm} from './tab-wsfed-attrrelease.form';

/**
 * Component to display/update Ws Fed attribute release options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-wsfed-attrrelease',
  templateUrl: './tab-wsfed-attrrelease.component.html'
})
export class TabWsfedAttrreleaseComponent {

  readonly key = 'wsfed-attrrelease';
  get tab() { return this.service.form.get(this.key) as TabWsFedReleaseForm; }
  set tab(f: TabWsFedReleaseForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabWsFedReleaseForm(service.registeredService.attributeReleasePolicy as WsFederationClaimsReleasePolicy);
    }
  }
}
