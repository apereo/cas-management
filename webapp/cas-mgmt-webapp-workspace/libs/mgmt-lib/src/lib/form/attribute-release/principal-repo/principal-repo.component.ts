import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';
import {PrincipalRepoType} from 'domain-lib';
import {CachingPrincipalRepoForm, PrincipalRepoForm} from './principal-repo.form';

@Component({
  selector: 'lib-attribute-release-principal-repo',
  templateUrl: './principal-repo.component.html'
})
export class PrincipalRepoComponent implements OnInit {
  type: PrincipalRepoType;
  TYPE = PrincipalRepoType;

  @Input()
  form: PrincipalRepoForm;

  @Input()
  typeControl: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  caching(): CachingPrincipalRepoForm {
    return this.form as CachingPrincipalRepoForm;
  }

}
