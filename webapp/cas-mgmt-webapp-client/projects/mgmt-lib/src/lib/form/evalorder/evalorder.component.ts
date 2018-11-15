import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-evalorder',
  templateUrl: './evalorder.component.html'
})
export class EvalorderComponent implements OnInit {

  evalOrder: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.evalOrder = new MgmtFormControl(this.data.service.evaluationOrder, this.data.original.evaluationOrder);
  }

}
