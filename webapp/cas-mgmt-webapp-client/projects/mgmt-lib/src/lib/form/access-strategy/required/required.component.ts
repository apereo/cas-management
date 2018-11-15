import { Component, OnInit } from '@angular/core';
import {DataRecord} from '../../data';
import {FormData} from '../../../domain/form-data';
import {RegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css']
})
export class RequiredComponent implements OnInit {

  formData: FormData;
  accessStrategy: RegisteredServiceAccessStrategy;
  original: RegisteredServiceAccessStrategy;
  caseInsensitive: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.accessStrategy = data.service.accessStrategy;
    this.formData = data.formData;
    this.original = data.original && data.original.accessStrategy;
  }

  ngOnInit() {
    this.caseInsensitive = new MgmtFormControl(this.accessStrategy.caseInsensitive, this.original.caseInsensitive);
  }

}
