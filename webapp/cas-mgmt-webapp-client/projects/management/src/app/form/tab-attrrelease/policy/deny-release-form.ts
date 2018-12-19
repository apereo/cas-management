import {BaseReleaseForm} from './base-release-form';
import {DenyAllAttributeReleasePolicy} from 'mgmt-lib';

export class DenyReleaseForm extends BaseReleaseForm<DenyAllAttributeReleasePolicy> {

  constructor(public data: DenyAllAttributeReleasePolicy) {
    super(data);
    this.setValue(super.formMap());
  }
}
