import {Component, OnInit} from '@angular/core';
import {TimeBasedRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  accessStrategy: TimeBasedRegisteredServiceAccessStrategy;
  original: TimeBasedRegisteredServiceAccessStrategy;

  constructor(public data: DataRecord) {
    this.accessStrategy = data.service.accessStrategy as TimeBasedRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as TimeBasedRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
  }

}
