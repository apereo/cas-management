import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {DataRecord} from '../data';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-privacy-url',
  templateUrl: './privacy-url.component.html',
  styleUrls: ['./privacy-url.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => PrivacyUrlComponent)
  }]
})
export class PrivacyUrlComponent extends HasControls implements OnInit {

  @Input()
  data: String[];

  privacyUrl: MgmtFormControl;

  constructor() {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('privacyUrl', this.privacyUrl);
    return c;
  }

  ngOnInit() {
    this.privacyUrl = new MgmtFormControl(this.data[0], this.data[1]);
  }

}
