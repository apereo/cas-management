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

  @Input()
  control: FormGroup;
  typeControl: MgmtFormControl;
  anonymous: MgmtFormControl;
  principal: MgmtFormControl;

  constructor(public data: DataRecord,
    public formData: FormDataService) {
  }

  ngOnInit() {
    this.typeControl = this.control.get('type') as MgmtFormControl;
    this.anonymous = this.control.get('anonymous') as MgmtFormControl;
    this.principal = this.control.get('principal') as MgmtFormControl;
  }

}
