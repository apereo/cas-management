import {Component, forwardRef, OnInit} from '@angular/core';
import {RegisteredServiceAttributeReleasePolicy} from '../../../domain/attribute-release';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-attribute-release-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ChecksComponent)
  }]
})
export class ChecksComponent extends HasControls implements OnInit {

  policy: RegisteredServiceAttributeReleasePolicy;
  original: RegisteredServiceAttributeReleasePolicy;
  excludeDefaultAttributes: MgmtFormControl;
  authorizedToReleaseCredentialPassword: MgmtFormControl;
  authorizedToReleaseProxyGrantingTicket: MgmtFormControl;
  authorizedToReleaseAuthenticationAttributes: MgmtFormControl;


  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.attributeReleasePolicy;
    this.original = data.original && data.service.attributeReleasePolicy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('excludeDefaultAttributes', this.excludeDefaultAttributes);
    c.set('authorizedToReleaseCredentialPassword', this.authorizedToReleaseCredentialPassword);
    c.set('authorizedToReleaseProxyGrantingTicket', this.authorizedToReleaseProxyGrantingTicket);
    c.set('authorizedToReleaseAuthenticatedAttributes', this.authorizedToReleaseAuthenticationAttributes);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.excludeDefaultAttributes = new MgmtFormControl(this.policy.excludeDefaultAttributes, og.excludeDefaultAttributes);
    this.authorizedToReleaseCredentialPassword = new MgmtFormControl(this.policy.authorizedToReleaseCredentialPassword,
      og.authorizedToReleaseCredentialPassword);
    this.authorizedToReleaseProxyGrantingTicket = new MgmtFormControl(this.policy.authorizedToReleaseProxyGrantingTicket,
      og.authorizedToReleaseProxyGrantingTicket);
    this.authorizedToReleaseAuthenticationAttributes = new MgmtFormControl(this.policy.authorizedToReleaseAuthenticationAttributes,
      og.authorizedToReleaseAuthenticationAttributes);
  }

}
