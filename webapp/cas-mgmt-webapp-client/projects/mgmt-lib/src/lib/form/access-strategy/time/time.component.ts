import {Component, forwardRef, OnInit} from '@angular/core';
import {TimeBasedRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => TimeComponent)
  }]
})
export class TimeComponent extends HasControls implements OnInit {

  accessStrategy: TimeBasedRegisteredServiceAccessStrategy;
  original: TimeBasedRegisteredServiceAccessStrategy;
  startTime: MgmtFormControl;
  endTime: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.accessStrategy = data.service.accessStrategy as TimeBasedRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as TimeBasedRegisteredServiceAccessStrategy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('startingDateTime', this.startTime);
    c.set('endingDateTime', this.endTime);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.startTime = new MgmtFormControl(this.accessStrategy.startingDateTime, og.startingDateTime);
    this.endTime = new MgmtFormControl(this.accessStrategy.endingDateTime, og.endingDateTime);
  }

}
