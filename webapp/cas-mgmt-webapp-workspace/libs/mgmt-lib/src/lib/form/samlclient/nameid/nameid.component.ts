import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {NameidForm} from './nameid.form';

@Component({
  selector: 'lib-nameid',
  templateUrl: './nameid.component.html'
})
export class SamlNameidComponent implements OnInit {

  @Input()
  form: NameidForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
