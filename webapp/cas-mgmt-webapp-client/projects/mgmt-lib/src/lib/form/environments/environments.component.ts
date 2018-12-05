import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() { }

  ngOnInit() {
  }

}
