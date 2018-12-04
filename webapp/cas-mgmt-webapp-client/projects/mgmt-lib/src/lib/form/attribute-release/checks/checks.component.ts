import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-attribute-release-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  @Input()
  control: FormGroup;
  excludeDefaultAttributes: MgmtFormControl;
  authorizedToReleaseCredentialPassword: MgmtFormControl;
  authorizedToReleaseProxyGrantingTicket: MgmtFormControl;
  authorizedToReleaseAuthenticationAttributes: MgmtFormControl;


  constructor() {
  }

  ngOnInit() {
    this.excludeDefaultAttributes = this.control.get('excludeDefaultAttributes') as MgmtFormControl;
    this.authorizedToReleaseCredentialPassword = this.control.get('authorizedToReleaseCredentialPassword') as MgmtFormControl;
    this.authorizedToReleaseProxyGrantingTicket = this.control.get('authorizedToReleaseProxyGrantingTicket') as MgmtFormControl;
    this.authorizedToReleaseAuthenticationAttributes = this.control.get('authorizedToReleaseAuthenticationAttributes') as MgmtFormControl;
  }

}
