import {Component, forwardRef, OnInit} from '@angular/core';
import {FormData } from '../../../domain/form-data';
import {RegisteredServiceConsentPolicy} from '../../../domain/consent-policy';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-attribute-release-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ConsentComponent)
  }]
})
export class ConsentComponent extends HasControls implements OnInit {
  formData: FormData;

  policy: RegisteredServiceConsentPolicy;
  original: RegisteredServiceConsentPolicy;
  consentEnabled: MgmtFormControl;
  excluded: MgmtFormControl;
  includeOnly: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.attributeReleasePolicy && data.service.attributeReleasePolicy.consentPolicy;
    this.original = data.original && data.original.attributeReleasePolicy
      && data.original.attributeReleasePolicy.consentPolicy;
    this.formData = data.formData;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('consentEnabled', this.consentEnabled);
    c.set('excluded', this.excluded);
    c.set('includeOnly', this.includeOnly);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.consentEnabled = new MgmtFormControl(this.policy.enabled, og.enabled);
    this.excluded = new MgmtFormControl(this.policy.excludedAttributes, og.excludedAttributes);
    this.includeOnly = new MgmtFormControl(this.policy.includeOnlyAttributes, og.includeOnlyAttributes);
  }


  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }
}
