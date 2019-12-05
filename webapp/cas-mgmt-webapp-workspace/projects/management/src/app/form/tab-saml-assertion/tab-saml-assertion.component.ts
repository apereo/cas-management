import { Component } from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlRegisteredService} from 'domain-lib';
import {TabSamlAssertionForm} from './tab-saml.form';

@Component({
  selector: 'app-tab-saml-assertion',
  templateUrl: './tab-saml-assertion.component.html',
  styleUrls: ['./tab-saml-assertion.component.css']
})
export class TabSamlAssertionComponent {

  form: TabSamlAssertionForm;
  readonly key = 'saml-assertion';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabSamlAssertionForm;
      return;
    }
    this.form = new TabSamlAssertionForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set(this.key, this.form);
  }

}
