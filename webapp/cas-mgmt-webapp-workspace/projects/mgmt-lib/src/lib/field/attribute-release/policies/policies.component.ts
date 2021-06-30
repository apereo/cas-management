import {Component, Input} from '@angular/core';
import {ReleasePolicyType} from '@apereo/mgmt-lib/src/lib/model';
import {AttributeReleaseForm} from '@apereo/mgmt-lib/src/lib/form';
import {FormControl} from '@angular/forms';

/**
 * Component to display and handle Attribute Release policies for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-attribute-release-policies',
  templateUrl: './policies.component.html'
})
export class PoliciesComponent {
  type: ReleasePolicyType;
  TYPE = ReleasePolicyType;
  chainableTypes = [
    { value: ReleasePolicyType.SCRIPT, display: 'SCRIPT' },
    { value: ReleasePolicyType.GROOVY, display: 'GROOVY' },
    { value: ReleasePolicyType.RETURN_ALL, display: 'RETURN ALL' },
    { value: ReleasePolicyType.DENY_ALL, display: 'DENY ALL' },
    { value: ReleasePolicyType.RETURN_ALLOWED, display: 'RETURN ALLOWED' },
    { value: ReleasePolicyType.RETURN_MAPPED, display: 'RETURN MAPPED' },
    { value: ReleasePolicyType.RESTFUL, display: 'RESTFUL' },
    { value: ReleasePolicyType.SAML_IDP, display: 'SAML_IDP' }
  ];
  types = [
    ...this.chainableTypes,
    {value: ReleasePolicyType.CHAINING, display: 'CHAINING'}
  ];

  display = ['Script Engine', 'Groovy Script', 'Return All',
    'Deny All', 'Return Allowed', 'Return Mapped', 'Return Restful', 'Chaining'];

  @Input()
  isSaml: boolean;

  @Input()
  form: AttributeReleaseForm;

  @Input()
  typeControl: FormControl;

  constructor() {
  }

}
