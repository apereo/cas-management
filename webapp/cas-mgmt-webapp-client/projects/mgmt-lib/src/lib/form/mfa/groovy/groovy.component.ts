import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html',
  styleUrls: ['./groovy.component.css']
})
export class GroovyComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
