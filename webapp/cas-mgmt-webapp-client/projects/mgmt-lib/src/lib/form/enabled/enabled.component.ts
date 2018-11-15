import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';


@Component({
  selector: 'lib-enabled',
  templateUrl: './enabled.component.html',
})
export class EnabledComponent implements OnInit {

  enabled: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.enabled = new MgmtFormControl(this.data.service.accessStrategy.enabled, this.data.original.accessStrategy.enabled);
  }

}
