import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {SamlIdpReleaseForm} from './saml-idp.form';

@Component({
  styleUrls: ['./saml-idp.component.css'],
  selector: 'lib-saml-idp',
  templateUrl: './saml-idp.component.html'
})
export class SamlIdpComponent implements OnInit {

  @Input()
  form: SamlIdpReleaseForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }
}
