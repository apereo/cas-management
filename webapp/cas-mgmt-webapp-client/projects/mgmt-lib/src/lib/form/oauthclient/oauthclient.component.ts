import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

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

  constructor() {
  }

  ngOnInit() {
    this.clientId = this.control.get('clientId') as MgmtFormControl;
    this.clientSecret = this.control.get('clientSecret') as MgmtFormControl;
    this.bypassApprovalPrompt = this.control.get('bypassApprovalPrompt') as MgmtFormControl;
    this.generateRefreshToken = this.control.get('generateRefreshToken') as MgmtFormControl;
  }

}
