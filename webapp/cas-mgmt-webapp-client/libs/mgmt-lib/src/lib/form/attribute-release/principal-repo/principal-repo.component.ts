import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../../form-data.service';
import {PrincipalRepoType} from 'domain-lib';

@Component({
  selector: 'lib-attribute-release-principal-repo',
  templateUrl: './principal-repo.component.html'
})
export class PrincipalRepoComponent implements OnInit {
  type: PrincipalRepoType;
  TYPE = PrincipalRepoType;

  @Input()
  control: FormGroup;
  typeControl: MgmtFormControl;
  timeUnit: MgmtFormControl;
  expiration: MgmtFormControl;
  mergingStrategy: MgmtFormControl;


  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.typeControl = this.control.get('type') as MgmtFormControl;
    this.timeUnit = this.control.get('timeUnit') as MgmtFormControl;
    this.expiration = this.control.get('expiration') as MgmtFormControl;
    this.mergingStrategy = this.control.get('mergingStrategy') as MgmtFormControl;
  }

}
