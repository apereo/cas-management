import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {DataRecord} from '../../data';
import {AccessStrategyForm} from '../access-strategy.form';

@Component({
  selector: 'lib-required',
  templateUrl: './required.component.html'
})
export class RequiredComponent implements OnInit {

  @Input()
  form: AccessStrategyForm;

  constructor(public formData: FormDataService, public data: DataRecord) {
  }

  ngOnInit() {
  }

  availableAttributes() {
    const repos = this.data.service.attributeReleasePolicy.principalAttributesRepository.attributeRepositoryIds;
    return this.formData.availableAttributes(repos);
  }

}
