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

  groovy: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.groovy = this.control.get('groovyScript') as MgmtFormControl;
  }

}
