import {Component, OnInit} from '@angular/core';
import {RegisteredServiceAccessStrategy} from '../../domain/access-strategy';
import {DataRecord} from '../data';


@Component({
  selector: 'lib-enabled',
  templateUrl: './enabled.component.html',
})
export class EnabledComponent implements OnInit {

  accessStrategy: RegisteredServiceAccessStrategy;
  original: RegisteredServiceAccessStrategy;

  constructor(public data: DataRecord) {
    this.accessStrategy = data.service.accessStrategy;
    this.original = data.original && data.original.accessStrategy;
  }

  ngOnInit() {
  }

}
