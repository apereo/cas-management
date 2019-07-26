import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-oidc-options',
  templateUrl: './oidc-options.component.html'
})
export class OidcOptionsComponent implements OnInit {

  @Input()
  isOidc: boolean;
  @Input()
  isWsFed: boolean;
  @Input()
  control: MgmtFormControl;

  constructor(public formData: FormDataService) {}

  ngOnInit() {
  }

}
