import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-themeid',
  templateUrl: './themeid.component.html'
})
export class ThemeidComponent implements OnInit {

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
