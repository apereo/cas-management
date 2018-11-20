import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-linkrefs',
  templateUrl: './linkrefs.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => LinkrefsComponent)
  }]
})
export class LinkrefsComponent extends HasControls implements OnInit {

  @Input()
  data: String[];

  informationUrl: MgmtFormControl;

  constructor() {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('informationUrl', this.informationUrl);
    return c;
  }

  ngOnInit() {
    this.informationUrl = new MgmtFormControl(this.data[0], this.data[1]);
  }

}
