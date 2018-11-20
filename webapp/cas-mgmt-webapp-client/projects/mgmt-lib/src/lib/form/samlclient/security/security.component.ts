import {Component, forwardRef, OnInit} from '@angular/core';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => SamlSecurityComponent)
  }]
})
export class SamlSecurityComponent extends HasControls implements OnInit {

  service: SamlRegisteredService;
  original: SamlRegisteredService;
  signAssertions: MgmtFormControl;
  signResponses: MgmtFormControl;
  encryptAssertions: MgmtFormControl;
  signingCredentialType: MgmtFormControl;
  requiredAuthenticationContextClass: MgmtFormControl;
  assertionAudiences: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.service = data.service as SamlRegisteredService;
    this.original = data.original && data.original as SamlRegisteredService;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('signAssertions', this.signAssertions);
    c.set('signResponses', this.signResponses);
    c.set('encryptAssertions', this.encryptAssertions);
    c.set('signingCredentialType', this.signingCredentialType);
    c.set('requiredAuthentcationContextClass', this.requiredAuthenticationContextClass);
    c.set('aasertionAudiences', this.assertionAudiences);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.signAssertions = new MgmtFormControl(this.service.signAssertions, og.signAssertions);
    this.signResponses = new MgmtFormControl(this.service.signResponses, og.signResponses);
    this.encryptAssertions = new MgmtFormControl(this.service.encryptAssertions, og.encryptAssertions);
    this.signingCredentialType = new MgmtFormControl(this.service.signingCredentialType, og.signingCredentialType);
    this.requiredAuthenticationContextClass = new MgmtFormControl(this.service.requiredAuthenticationContextClass,
      og.requiredAuthenticationContextClass);
    this.assertionAudiences = new MgmtFormControl(this.service.assertionAudiences, og.assertionAudiences);
  }

}
