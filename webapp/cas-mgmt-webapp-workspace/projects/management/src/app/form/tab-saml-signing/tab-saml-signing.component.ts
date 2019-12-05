import { Component } from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlRegisteredService} from 'domain-lib';
import {TabSamlSigningForm} from './tab-saml-signing.form';

@Component({
  selector: 'app-tab-saml-signing',
  templateUrl: './tab-saml-signing.component.html',
  styleUrls: ['./tab-saml-signing.component.css']
})
export class TabSamlSigningComponent {

  form: TabSamlSigningForm;
  readonly key = 'saml-signing';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabSamlSigningForm;
      return;
    }
    this.form = new TabSamlSigningForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set(this.key, this.form);
  }

}
