import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {DefaultMfaForm} from './default.form';

@Component({
  selector: 'lib-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit {

  @Input()
  form: DefaultMfaForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  attributes(): string[] {
    return this.formData.availableAttributes(this.formData.options.attributeRepositories);
  }

}
