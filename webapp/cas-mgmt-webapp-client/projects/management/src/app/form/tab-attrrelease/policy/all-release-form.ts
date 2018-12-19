import {BaseReleaseForm} from './base-release-form';
import {ReturnAllAttributeReleasePolicy} from 'mgmt-lib';

export class AllReleaseForm extends BaseReleaseForm<ReturnAllAttributeReleasePolicy> {

  constructor(public data: ReturnAllAttributeReleasePolicy){
    super(data);
    this.setValue(super.formMap());
  }
}
