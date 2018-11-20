import {Component, forwardRef, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-evalorder',
  templateUrl: './evalorder.component.html',
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => EvalorderComponent)
  }]
})
export class EvalorderComponent extends HasControls implements OnInit {

  evalOrder: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('evalOrder', this.evalOrder);
    return c;
  }

  ngOnInit() {
    const og = this.data.original && this.data.original.evaluationOrder;
    this.evalOrder = new MgmtFormControl(this.data.service.evaluationOrder, og);
  }

}
