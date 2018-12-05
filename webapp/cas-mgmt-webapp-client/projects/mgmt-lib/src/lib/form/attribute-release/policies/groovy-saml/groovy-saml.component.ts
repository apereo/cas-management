import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

@Component({
  selector: 'lib-groovy-saml',
  templateUrl: './groovy-saml.component.html',
  styleUrls: ['./groovy-saml.component.css']
})
export class GroovySamlComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
