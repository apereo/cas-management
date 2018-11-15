import {Component, OnInit} from '@angular/core';
import {RegisteredServiceAttributeReleasePolicy} from '../../../domain/attribute-release';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-attribute-release-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  policy: RegisteredServiceAttributeReleasePolicy;
  original: RegisteredServiceAttributeReleasePolicy;
  excludeDefaultAttributes: MgmtFormControl;
  authorizedToReleaseCredentialPassword: MgmtFormControl;
  authorizedToReleaseProxyGrantingTicket: MgmtFormControl;
  authorizedToReleaseAuthenticationAttributes: MgmtFormControl;


  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy;
    this.original = data.original && data.service.attributeReleasePolicy;
  }

  ngOnInit() {
    this.excludeDefaultAttributes = new MgmtFormControl(this.policy.excludeDefaultAttributes, this.original.excludeDefaultAttributes);
    this.authorizedToReleaseCredentialPassword = new MgmtFormControl(this.policy.authorizedToReleaseCredentialPassword,
      this.original.authorizedToReleaseCredentialPassword);
    this.authorizedToReleaseProxyGrantingTicket = new MgmtFormControl(this.policy.authorizedToReleaseProxyGrantingTicket,
      this.original.authorizedToReleaseProxyGrantingTicket);
    this.authorizedToReleaseAuthenticationAttributes = new MgmtFormControl(this.policy.authorizedToReleaseAuthenticationAttributes,
      this.original.authorizedToReleaseAuthenticationAttributes);
  }

}
