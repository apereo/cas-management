import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-groovy-saml',
  templateUrl: './groovy-saml.component.html',
  styleUrls: ['./groovy-saml.component.css']
})
export class GroovySamlComponent implements OnInit {

  @Input()
  control: FormGroup;

  script: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.script = this.control.get('groovySaml') as MgmtFormControl;
  }

}
