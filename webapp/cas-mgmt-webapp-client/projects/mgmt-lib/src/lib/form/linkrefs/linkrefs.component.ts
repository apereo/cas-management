import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-linkrefs',
  templateUrl: './linkrefs.component.html'
})
export class LinkrefsComponent implements OnInit {


  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
