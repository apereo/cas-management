import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';
import {RegisteredServiceAccessStrategy} from '../../../domain/access-strategy';


@Component({
  selector: 'app-enabled',
  templateUrl: './enabled.component.html',
})
export class EnabledComponent implements OnInit {

  accessStrategy: RegisteredServiceAccessStrategy;
  original: RegisteredServiceAccessStrategy;

  constructor(public messages: Messages,
              public data: Data) {
    this.accessStrategy = data.service.accessStrategy;
    this.original = data.original && data.original.accessStrategy;
  }

  ngOnInit() {
  }

}
