import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlContainer, FormControl, NgForm} from '@angular/forms';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';

@Component({
  selector: 'lib-logouttypeeval',
  templateUrl: './logouttypeeval.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => LogouttypeevalComponent)
  }]
})
export class LogouttypeevalComponent extends HasControls implements OnInit {

  logoutType: MgmtFormControl

  constructor(public data: DataRecord) {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('logoutType', this.logoutType);
    return c;
  }

  ngOnInit() {
    const og = this.data.original && this.data.original.logoutType;
    this.logoutType = new MgmtFormControl(this.data.service.logoutType, og);
  }

}
