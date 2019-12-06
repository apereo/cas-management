import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {AnonymousUidForm} from './anonymous.form';

@Component({
  selector: 'lib-anonymous',
  templateUrl: './anonymous.component.html'
})
export class AnonymousComponent implements OnInit {

  @Input()
  form: AnonymousUidForm;

  @Input()
  attributes: string[];

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
