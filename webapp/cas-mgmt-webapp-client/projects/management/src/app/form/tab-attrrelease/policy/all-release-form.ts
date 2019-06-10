import {BaseReleaseForm} from './base-release-form';
import {ReturnAllAttributeReleasePolicy} from 'mgmt-lib';

export class AllReleaseForm extends BaseReleaseForm<ReturnAllAttributeReleasePolicy> {

  constructor(public policy: ReturnAllAttributeReleasePolicy) {
    super(policy);
    this.setValue(super.formMap());
  }
}
