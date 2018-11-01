import {Component, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-logouttypeeval',
  templateUrl: './logouttypeeval.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class LogouttypeevalComponent implements OnInit {

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
