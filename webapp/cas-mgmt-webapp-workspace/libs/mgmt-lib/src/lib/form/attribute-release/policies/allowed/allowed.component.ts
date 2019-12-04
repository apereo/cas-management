import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {AllowedReleasedForm} from './allowed.form';

@Component({
  selector: 'lib-allowed',
  templateUrl: './allowed.component.html'
})
export class AllowedComponent implements OnInit {

  @Input()
  form: AllowedReleasedForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  availableAttributes() {
    const repos = this.form.principalRepo.attributeRepositoryIds.value as string[];
    return this.formData.availableAttributes(repos);
  }

}


