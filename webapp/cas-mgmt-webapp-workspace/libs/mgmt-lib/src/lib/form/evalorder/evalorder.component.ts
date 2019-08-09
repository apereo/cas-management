import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-evalorder',
  templateUrl: './evalorder.component.html'
})
export class EvalorderComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
