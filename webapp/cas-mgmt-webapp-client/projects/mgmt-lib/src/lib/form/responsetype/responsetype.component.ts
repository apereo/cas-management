import {Component, forwardRef, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-responsetype',
  templateUrl: './responsetype.component.html',
  styleUrls: ['./responsetype.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ResponsetypeComponent)
  }]
})
export class ResponsetypeComponent extends HasControls implements OnInit {

  responseType: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('responseType', this.responseType);
    return c;
  }

  ngOnInit() {
    const og = this.data.original && this.data.original.responseType;
    this.responseType = new MgmtFormControl(this.data.service.responseType, og);
  }

}
