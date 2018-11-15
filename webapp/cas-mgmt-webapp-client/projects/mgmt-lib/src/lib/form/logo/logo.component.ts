import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent implements OnInit {

  logo: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.logo = new MgmtFormControl(this.data.service.logo, this.data.original.logo);
  }

}
