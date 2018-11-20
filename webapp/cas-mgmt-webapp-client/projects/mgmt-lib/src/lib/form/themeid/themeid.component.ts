import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-themeid',
  templateUrl: './themeid.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ThemeidComponent)
  }]
})
export class ThemeidComponent extends HasControls implements OnInit {

  @Input()
  data: String[];

  theme: MgmtFormControl;

  constructor() {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('theme', this.theme);
    return c;
  }

  ngOnInit() {
    this.theme = new MgmtFormControl(this.data[0], this.data[1]);
  }

}
