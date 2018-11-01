import {Component, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-servicename',
  templateUrl: './servicename.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class ServicenameComponent implements OnInit {

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
