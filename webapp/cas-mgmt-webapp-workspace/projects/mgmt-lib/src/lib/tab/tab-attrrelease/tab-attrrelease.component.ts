import {Component} from '@angular/core';
import {TabReleaseForm} from './tab-attrrelease.form';
import {ReleasePolicyType} from '@apereo/mgmt-lib/src/lib/model';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update Attribute Release policies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-attrrelease',
  templateUrl: './tab-attrrelease.component.html'
})
export class TabAttrreleaseComponent {

  readonly key = 'attributeRelease';
  get tab() { return this.service.form.get(this.key) as TabReleaseForm; }
  set tab(f: TabReleaseForm) { this.service.form.addControl(this.key, f); }

  TYPE = ReleasePolicyType;

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
   if (!service.form.contains(this.key)) {
     this.tab = new TabReleaseForm(service.registeredService.attributeReleasePolicy);
   }
  }
}
