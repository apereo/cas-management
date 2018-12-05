import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-nameid',
  templateUrl: './nameid.component.html',
  styleUrls: ['./nameid.component.css']
})
export class SamlNameidComponent implements OnInit {

  @Input()
  control: FormGroup;
  requiredNameIdFormat: MgmtFormControl;
  serviceProviderNameIdQualifier: MgmtFormControl;
  nameIdQualifier: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.requiredNameIdFormat = this.control.get('requiredNameIdFormat') as MgmtFormControl;
    this.serviceProviderNameIdQualifier = this.control.get('serviceProviderNameIdQualifier') as MgmtFormControl;
    this.nameIdQualifier = this.control.get('nameIdQualifier') as MgmtFormControl;
  }

}
