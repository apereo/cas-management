import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';

@Component({
  selector: 'app-evalorder',
  templateUrl: './evalorder.component.html'
})
export class EvalorderComponent implements OnInit {


  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
