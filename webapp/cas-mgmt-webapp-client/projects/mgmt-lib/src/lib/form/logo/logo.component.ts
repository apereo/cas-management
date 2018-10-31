import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent implements OnInit {

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
