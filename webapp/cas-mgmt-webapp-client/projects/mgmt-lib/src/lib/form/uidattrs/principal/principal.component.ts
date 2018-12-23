import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent implements OnInit {

  @Input()
  control: FormGroup;
  usernameAttribute: MgmtFormControl;
  encryptUserName: MgmtFormControl;
  canonicalizationMode: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.usernameAttribute = this.control.get('usernameAttribute') as MgmtFormControl;
    this.encryptUserName = this.control.get('encryptUserName') as MgmtFormControl;
    this.canonicalizationMode = this.control.get('canonicalizationMode') as MgmtFormControl;
  }

}
