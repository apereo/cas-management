import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../form-data.service';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {MfaPolicyType} from 'domain-lib';
import {MfaForm} from './mfa.form';

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
  form: MfaForm;

  @Input()
  typeControl: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
