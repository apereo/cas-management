import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlContainer, FormControl, NgForm} from '@angular/forms';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';

@Component({
  selector: 'lib-logout',
  templateUrl: './logout.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => LogoutComponent)
  }]
})
export class LogoutComponent extends HasControls implements OnInit {

  logout: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('logout', this.logout);
    return c;
  }

  ngOnInit() {
    const og = this.data.original && this.data.original.logoutUrl;
    this.logout = new MgmtFormControl(this.data.service.logoutUrl, og);
  }

}
