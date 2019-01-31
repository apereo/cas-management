import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-saml-ldap',
  templateUrl: './saml-ldap.component.html'
})
export class SamlLdapComponent implements OnInit {

  @Input()
  control: FormGroup;


  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
