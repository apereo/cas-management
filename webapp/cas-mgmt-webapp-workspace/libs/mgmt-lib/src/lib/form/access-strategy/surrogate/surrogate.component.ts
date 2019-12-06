import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {SurrogateForm} from './surrogate.form';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-surrogate',
  templateUrl: './surrogate.component.html'
})
export class SurrogateComponent implements OnInit {

  @Input()
  form: SurrogateForm;

  constructor(public formData: FormDataService, public data: DataRecord) {
  }

  ngOnInit() {
  }

  availableAttributes() {
    const repos = this.data.service.attributeReleasePolicy.principalAttributesRepository.attributeRepositoryIds;
    return this.formData.availableAttributes(repos);
  }
}

