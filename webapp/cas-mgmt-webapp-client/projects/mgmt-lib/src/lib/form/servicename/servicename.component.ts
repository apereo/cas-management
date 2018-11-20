import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';

@Component({
  selector: 'lib-servicename',
  templateUrl: './servicename.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ServicenameComponent)
  }]
})
export class ServicenameComponent extends HasControls implements OnInit {

  @Input()
  data: String[];

  serviceName: MgmtFormControl;

  constructor() {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('name', this.serviceName);
    return c;
  }

  ngOnInit() {
    this.serviceName = new MgmtFormControl(this.data[0], this.data[1], Validators.required);
  }

}
