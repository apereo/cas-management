import {Component, OnInit} from '@angular/core';
import {TimeBasedRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  accessStrategy: TimeBasedRegisteredServiceAccessStrategy;
  original: TimeBasedRegisteredServiceAccessStrategy;
  startTime: MgmtFormControl;
  endTime: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.accessStrategy = data.service.accessStrategy as TimeBasedRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as TimeBasedRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
    this.startTime = new MgmtFormControl(this.accessStrategy.startingDateTime, this.original.startingDateTime);
    this.endTime = new MgmtFormControl(this.accessStrategy.endingDateTime, this.original.endingDateTime);
  }

}
