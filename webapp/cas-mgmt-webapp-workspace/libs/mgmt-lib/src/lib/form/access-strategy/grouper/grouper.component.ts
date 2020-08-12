import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {GrouperForm} from './grouper.form';

@Component({
  selector: 'lib-grouper',
  templateUrl: './grouper.component.html'
})
export class GrouperComponent implements OnInit {

  @Input()
  form: GrouperForm;
  fields: string[];

  constructor(public formData: FormDataService) {
    this.fields = formData.options.grouperFields;
  }

  ngOnInit() {
  }

}
