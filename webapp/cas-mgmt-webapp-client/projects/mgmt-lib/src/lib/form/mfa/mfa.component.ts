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
  @Input()
  typeControl: MgmtFormControl;


  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
