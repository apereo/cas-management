import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  @Input()
  control: FormGroup;

  startingDatetime: MgmtFormControl;
  endingDatetime: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.startingDatetime = this.control.get('startingDatetime') as MgmtFormControl;
    this.endingDatetime = this.control.get('endingDatetime') as MgmtFormControl;
  }

}
