import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-responsetype',
  templateUrl: './responsetype.component.html',
  styleUrls: ['./responsetype.component.css']
})
export class ResponsetypeComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
