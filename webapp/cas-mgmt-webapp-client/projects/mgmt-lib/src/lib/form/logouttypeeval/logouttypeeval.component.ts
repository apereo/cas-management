import {Component, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-logouttypeeval',
  templateUrl: './logouttypeeval.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class LogouttypeevalComponent implements OnInit {

  logoutType: MgmtFormControl

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.logoutType = new MgmtFormControl(this.data.service.logoutType, this.data.original.logoutType);
  }

}
