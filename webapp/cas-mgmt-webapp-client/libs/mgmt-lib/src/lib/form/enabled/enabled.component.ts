import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';


@Component({
  selector: 'lib-enabled',
  templateUrl: './enabled.component.html'
})
export class EnabledComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
