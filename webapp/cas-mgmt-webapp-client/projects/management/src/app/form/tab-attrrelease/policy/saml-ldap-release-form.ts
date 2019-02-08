import {BaseReleaseForm} from './base-release-form';
import {LdapSamlRegisteredServiceAttributeReleasePolicy} from 'mgmt-lib';
import {AttributeForm} from '@app/form/attribute-form';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {MgmtFormControl} from '../../../../../../mgmt-lib/src/lib/form/mgmt-formcontrol';

export class SamlLdapReleaseForm extends BaseReleaseForm<LdapSamlRegisteredServiceAttributeReleasePolicy> {

  constructor(public policy: LdapSamlRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('attributes', new FormArray([]));
    if (policy.allowedAttributes) {
      for (let i = 0; i < Object.keys(policy.allowedAttributes).length; i++) {
        (<FormArray>this.get('attributes')).push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    const attr = [];
    if (this.policy.allowedAttributes) {
      for (let a of Array.from(Object.keys(this.policy.allowedAttributes))) {
        attr.push({
          key: {key: a, value: ''},
          value: this.policy.allowedAttributes[a].toString()
        });
      }
    }
    frm['attributes'] = attr;
    return frm;
  }

  mapForm(policy: LdapSamlRegisteredServiceAttributeReleasePolicy) {
    super.mapForm(policy);
    const attr = this.get('attributes') as FormArray;
    if (attr.length > 0) {
      const map = new Map<string, string[]>();
      for (let c of attr.value) {
        map[c.key.key] = c.value.split(",")
      }
      policy.allowedAttributes = map;
    }
  }



}
