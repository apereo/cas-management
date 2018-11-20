import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-logo',
  templateUrl: './logo.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => LogoComponent)
  }]
})
export class LogoComponent extends HasControls implements OnInit {

  @Input()
  data: String[];

  logo: MgmtFormControl;

  constructor() {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('logo', this.logo);
    return c;
  }

  ngOnInit() {
    this.logo = new MgmtFormControl(this.data[0], this.data[1]);
  }

}
