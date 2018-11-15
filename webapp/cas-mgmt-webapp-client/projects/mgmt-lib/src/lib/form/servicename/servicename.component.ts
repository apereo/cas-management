import {Component, OnInit} from '@angular/core';
import {ControlContainer, NgForm, Validators} from '@angular/forms';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-servicename',
  templateUrl: './servicename.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class ServicenameComponent implements OnInit {

  serviceName: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.serviceName = new MgmtFormControl(this.data.service.name, this.data.original.name, Validators.required);
  }

}
