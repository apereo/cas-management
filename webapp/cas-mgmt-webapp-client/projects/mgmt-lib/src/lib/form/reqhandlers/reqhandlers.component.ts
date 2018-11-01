import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-reqhandlers',
  templateUrl: './reqhandlers.component.html'
})
export class RequiredHandlersComponent implements OnInit {

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
