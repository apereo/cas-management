import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlForm} from './saml-form';

@Component({
  selector: 'app-tab-saml',
  templateUrl: './tab-saml.component.html',
  styleUrls: ['./tab-saml.component.css']
})
export class TabSamlComponent {

  saml: SamlForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('saml')) {
      this.saml = this.data.formMap.get('saml') as SamlForm;
      return;
    }
    this.saml = new SamlForm(this.data);
    this.data.formMap.set('saml', this.saml);
  }
}
