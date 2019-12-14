import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {MappedReleaseForm} from './mapped.form';

@Component({
  selector: 'lib-mapped',
  templateUrl: './mapped.component.html'
})
export class MappedComponent implements OnInit {

  @Input()
  form: MappedReleaseForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  availableAttributes(): string[] {
    return this.formData.options.availableAttributes;
  }

}
