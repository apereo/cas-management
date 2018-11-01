import { Component, OnInit } from '@angular/core';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-responsetype',
  templateUrl: './responsetype.component.html',
  styleUrls: ['./responsetype.component.css']
})
export class ResponsetypeComponent implements OnInit {

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
