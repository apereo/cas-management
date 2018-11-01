import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-evalorder',
  templateUrl: './evalorder.component.html'
})
export class EvalorderComponent implements OnInit {


  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
