import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {DataRecord} from '../../../data.model';
import {FilterMappedRegExForm} from '../filters.form';

@Component({
  selector: 'lib-filter-mapped',
  templateUrl: './filter-mapped.component.html',
  styleUrls: ['./filter-mapped.component.css']
})
export class FilterMappedComponent implements OnInit {

  @Input()
  form: FilterMappedRegExForm;

  constructor(public formData: FormDataService, public data: DataRecord) {
  }

  ngOnInit() {
  }

  availableAttributes() {
    const repos = this.data.service.attributeReleasePolicy.principalAttributesRepository.attributeRepositoryIds;
    return this.formData.availableAttributes(repos);
  }
}
