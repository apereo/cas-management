import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

@Component({
  selector: 'lib-restful',
  templateUrl: './restful.component.html',
  styleUrls: ['./restful.component.css']
})
export class RestfulComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
