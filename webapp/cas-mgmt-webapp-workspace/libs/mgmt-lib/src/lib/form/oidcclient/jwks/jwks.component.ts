import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-jwks',
  templateUrl: './jwks.component.html',
  styleUrls: ['./jwks.component.css']
})
export class JwksComponent implements OnInit {

  @Input()
  control: FormGroup;

  @Input()
  hideKeys = false;
  jwks: MgmtFormControl;
  jwksCacheDuration: MgmtFormControl;
  jwksCacheTimeUnit: MgmtFormControl;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
    this.jwks = this.control.get('jwks') as MgmtFormControl;
    this.jwksCacheDuration = this.control.get('jwksCacheDuration') as MgmtFormControl;
    this.jwksCacheTimeUnit = this.control.get('jwksCacheTimeUnit') as MgmtFormControl;
  }

}
