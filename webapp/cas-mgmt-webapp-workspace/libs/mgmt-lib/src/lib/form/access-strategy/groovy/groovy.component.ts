import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html'
})
export class GroovyComponent implements OnInit {

  @Input()
  control: FormGroup;

  script: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.script = this.control.get('groovyScript') as MgmtFormControl;
  }

}
