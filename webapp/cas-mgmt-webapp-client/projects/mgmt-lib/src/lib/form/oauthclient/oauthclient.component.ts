import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../form-data.service';

@Component({
  selector: 'lib-oauthclient',
  templateUrl: './oauthclient.component.html'
})
export class OauthclientComponent implements OnInit {

  @Input()
  control: FormGroup;
  showOAuthSecret: boolean;
  clientId: MgmtFormControl;
  clientSecret: MgmtFormControl;
  bypassApprovalPrompt: MgmtFormControl;
  generateRefreshToken: MgmtFormControl;
  responseTypes: MgmtFormControl;
  grantTypes: MgmtFormControl;

  @Output()
  generateId: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  generateSecret: EventEmitter<void> = new EventEmitter<void>();

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.clientId = this.control.get('clientId') as MgmtFormControl;
    this.clientSecret = this.control.get('clientSecret') as MgmtFormControl;
    this.bypassApprovalPrompt = this.control.get('bypassApprovalPrompt') as MgmtFormControl;
    this.generateRefreshToken = this.control.get('generateRefreshToken') as MgmtFormControl;
    this.responseTypes = this.control.get('responseTypes') as MgmtFormControl;
    this.grantTypes = this.control.get('grantTypes') as MgmtFormControl;
  }

}
