import {Component, Input, OnInit} from '@angular/core';
import {UserAttributeType} from '../../domain/attribute-provider';
import {FormDataService} from '../../form-data.service';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

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
  control: FormGroup;

  @Input()
  typeControl: MgmtFormControl;

  encryptUsername: MgmtFormControl;
  canonicalizationMode: MgmtFormControl;

  constructor(public data: DataRecord,
    public formData: FormDataService) {
  }

  ngOnInit() {
    this.encryptUsername = this.control.get('encryptUsername') as MgmtFormControl;
    this.canonicalizationMode = this.control.get('canonicalizationMode') as MgmtFormControl;
  }

}
