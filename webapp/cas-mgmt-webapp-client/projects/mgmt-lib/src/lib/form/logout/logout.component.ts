import {Component, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-logout',
  templateUrl: './logout.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class LogoutComponent implements OnInit {

  logout: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.logout = new MgmtFormControl(this.data.service.logoutUrl, this.data.original.logoutUrl);
  }

}
