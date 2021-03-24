import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {TabUsernameattrForm} from './tab-usernameattr.form';

/**
 * Component to display/update username attribute options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-usernameattr',
  templateUrl: './tab-usernameattr.component.html'
})
export class TabUsernameattrComponent {

  readonly key = 'uidAttrs';
  get tab() { return this.service.form.get(this.key) as TabUsernameattrForm; }
  set tab(f: TabUsernameattrForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabUsernameattrForm(service.registeredService.usernameAttributeProvider);
    }
  }

}
