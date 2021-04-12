import {Component} from '@angular/core';
import {OidcRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {TabOidcAttrForm} from './tab-oidc-attrrelease.form';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update Oidc Attributes.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-oidc-attrrelease',
  templateUrl: './tab-oidc-attrrelease.component.html'
})
export class TabOidcAttrreleaseComponent {

  readonly key = 'oidc-scopes';
  get tab() { return this.service.form.get(this.key) as TabOidcAttrForm; }
  set tab(f: TabOidcAttrForm) { this.service.form.addControl(this.key, f); }

  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabOidcAttrForm(service.registeredService as OidcRegisteredService);
    }
  }
}
