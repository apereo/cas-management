import {Component, Input, OnInit} from '@angular/core';
import {UserAttributeType} from 'domain-lib';
import {FormDataService} from '../../form-data.service';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {UidattrsForm} from './uidattrs.form';

@Component({
  selector: 'lib-uidattrs',
  templateUrl: './uidattrs.component.html'
})
export class UidattrsComponent implements OnInit {

  type: UserAttributeType;
  TYPE = UserAttributeType;
  types = [
    UserAttributeType.DEFAULT,
    UserAttributeType.ANONYMOUS,
    UserAttributeType.PRINCIPAL_ATTRIBUTE,
    UserAttributeType.GROOVY,
    UserAttributeType.SCRIPTED
  ];
  display = ['Default', 'Anonymous', 'Principal Attribute', 'Groovy', 'Scripted'];

  @Input()
  form: UidattrsForm;

  @Input()
  typeControl: MgmtFormControl;

  @Input()
  attributes: string[];

  constructor(public data: DataRecord,
              public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
