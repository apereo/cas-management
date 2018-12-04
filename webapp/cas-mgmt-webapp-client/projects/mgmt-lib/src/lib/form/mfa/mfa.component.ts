import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../form-data.service';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {MfaPolicyType} from '../../domain/multifactor';

@Component({
  selector: 'lib-mfa',
  templateUrl: './mfa.component.html'
})
export class MfaComponent implements OnInit {

  type: MfaPolicyType;
  TYPE = MfaPolicyType;
  types = [MfaPolicyType.DEFAULT, MfaPolicyType.GROOVY];
  display = ['Default', 'Groovy Script'];

  @Input()
  control: FormGroup;
  typeControl: MgmtFormControl;
  defaultMfa: MgmtFormControl;
  groovy: MgmtFormControl;


  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.typeControl = this.control.get('type') as MgmtFormControl;
    this.defaultMfa = this.control.get('defaultMfa') as MgmtFormControl;
    this.groovy = this.control.get('groovy') as MgmtFormControl;
  }



}
