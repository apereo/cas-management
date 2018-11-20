import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';

@Component({
  selector: 'lib-servicedesc',
  templateUrl: './servicedesc.component.html',
  providers: [{provide: HasControls, useExisting: forwardRef(() => ServicedescComponent)}],
})
export class ServicedescComponent extends HasControls implements OnInit {

  @Input()
  data: String[];

  description: MgmtFormControl;

  constructor() {
    super();
  }

  ngOnInit() {
    this.description = new MgmtFormControl(this.data[0], this.data[1]);
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('description', this.description);
    return c;
  }

}
