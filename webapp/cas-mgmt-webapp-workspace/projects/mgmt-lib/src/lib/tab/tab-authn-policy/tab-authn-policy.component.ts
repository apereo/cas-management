import {Component} from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {TabAuthnPolicyForm} from './tab-authn-policy.form';

@Component({
  selector: 'lib-tab-authn-policy',
  templateUrl: './tab-authn-policy.component.html',
  styleUrls: ['./tab-authn-policy.component.css']
})
export class TabAuthnPolicyComponent {

  readonly key = 'authnPolicy';
  get tab() { return this.service.form.get(this.key) as TabAuthnPolicyForm; }
  set tab(f: TabAuthnPolicyForm) { this.service.form.addControl(this.key, f); }


  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabAuthnPolicyForm(service.registeredService);
    }
  }

}
