import {Component, Input, OnInit} from '@angular/core';
import {UserAttributeType} from '@apereo/mgmt-lib/src/lib/model';
import {UidattrsForm} from '@apereo/mgmt-lib/src/lib/form';
import {FormControl} from '@angular/forms';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update UID attribute policies.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-uidattrs',
  templateUrl: './uidattrs.component.html'
})
export class UidattrsComponent {

  type: UserAttributeType;
  TYPE = UserAttributeType;
  types = [
    {value: UserAttributeType.DEFAULT, display: 'Default'},
    {value: UserAttributeType.ANONYMOUS, display: 'Anonymous'},
    {value: UserAttributeType.PRINCIPAL_ATTRIBUTE, display: 'Principal Attribute'},
    {value: UserAttributeType.GROOVY, display: 'Groovy'},
    {value: UserAttributeType.SCRIPTED, display: 'Scripted'}
  ];

  @Input()
  form: UidattrsForm;

  @Input()
  typeControl: FormControl;

  constructor(public config: AppConfigService) {
  }

}
