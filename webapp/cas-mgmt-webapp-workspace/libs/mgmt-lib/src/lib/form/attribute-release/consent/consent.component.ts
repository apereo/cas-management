import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {ConsentForm} from './consent.form';

@Component({
  selector: 'lib-attribute-release-consent',
  templateUrl: './consent.component.html'
})
export class ConsentComponent implements OnInit {

  @Input()
  form: ConsentForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }
}
