import {Component, Input, OnInit} from '@angular/core';
import {DataRecord} from '../data.model';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-reqhandlers',
  templateUrl: './reqhandlers.component.html'
})
export class RequiredHandlersComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
