import {Component, Input, OnInit} from '@angular/core';
import {ReleasePolicyType} from 'domain-lib';
import {FormDataService} from '../../../form-data.service';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-attribute-release-policies',
  templateUrl: './policies.component.html'
})
export class PoliciesComponent implements OnInit {
  type: ReleasePolicyType;
  TYPE = ReleasePolicyType;
  types = [
    ReleasePolicyType.SCRIPT,
    ReleasePolicyType.GROOVY,
    ReleasePolicyType.RETURN_ALL,
    ReleasePolicyType.DENY_ALL,
    ReleasePolicyType.RETURN_ALLOWED,
    ReleasePolicyType.RETURN_MAPPED,
    ReleasePolicyType.RESTFUL,
    ReleasePolicyType.SAML_LDAP,
    ReleasePolicyType.OAUTH
  ];
  display = ['Script Engine', 'Groovy Script', 'Return All',
    'Deny All', 'Return Allowed', 'Return Mapped', 'Return Restful', 'SAML LDAP', 'OAUTH LDAP'];

  @Input()
  isSaml: boolean;

  @Input()
  control: FormGroup;

  @Input()
  typeControl: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }

}
