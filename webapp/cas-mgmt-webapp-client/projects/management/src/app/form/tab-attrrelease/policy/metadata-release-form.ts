import {BaseReleaseForm} from './base-release-form';
import {MetadataEntityAttributesAttributeReleasePolicy, MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class MetadataReleaseForm extends BaseReleaseForm<MetadataEntityAttributesAttributeReleasePolicy> {

  constructor(public data: MetadataEntityAttributesAttributeReleasePolicy) {
    super(data);
    this.addControl('allowed', new MgmtFormControl(null));
    this.addControl('entityAttributeValues', new MgmtFormControl(null));
    this.addControl('entityAttributeFormat', new MgmtFormControl(null));
    this.addControl('entityAttribute', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['allowed'] = this.data.allowedAttributes;
    frm['entityAttributeValues'] = this.data.entityAttributeValues;
    frm['entityAttributeFormat'] = this.data.entityAttributeFormat;
    frm['entityAttribute'] = this.data.entityAttribute;
    return frm;
  }

  mapForm(policy: MetadataEntityAttributesAttributeReleasePolicy) {
    super.mapForm(policy);
    const frm = this.value;
    policy.allowedAttributes = frm.allowed;
    policy.entityAttributeValues = frm.entityAttributeValues;
    policy.entityAttributeFormat = frm.entityAttributeFormat;
    policy.entityAttribute = frm.entityAttribute;
  }
}
