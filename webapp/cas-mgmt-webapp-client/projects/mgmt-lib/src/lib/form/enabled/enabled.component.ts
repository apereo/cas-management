import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'lib-enabled',
  templateUrl: './enabled.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => EnabledComponent)
  }]
})
export class EnabledComponent extends HasControls implements OnInit {

  @Input()
  data: boolean[];

  enabled: MgmtFormControl;

  constructor() {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('enabled', this.enabled);
    return c;
  }

  ngOnInit() {
    this.enabled = new MgmtFormControl(this.data[0], this.data[1]);
  }

}
