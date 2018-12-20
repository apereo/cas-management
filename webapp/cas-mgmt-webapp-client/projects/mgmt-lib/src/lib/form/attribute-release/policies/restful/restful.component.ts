import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-restful',
  templateUrl: './restful.component.html',
  styleUrls: ['./restful.component.css']
})
export class RestfulComponent implements OnInit {

  @Input()
  control: FormGroup;

  endpoint: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.endpoint = this.control.get('restful') as MgmtFormControl;
  }

}
