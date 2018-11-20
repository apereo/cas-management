import {Component, forwardRef, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-reqhandlers',
  templateUrl: './reqhandlers.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => RequiredHandlersComponent)
  }]
})
export class RequiredHandlersComponent extends HasControls implements OnInit {

  requiredHandlers: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('requiredHandlers', this.requiredHandlers);
    return c;
  }

  ngOnInit() {
    const og = this.data.original && this.data.original.requiredHandlers;
    this.requiredHandlers = new MgmtFormControl(this.data.service.requiredHandlers, og);
  }

}
