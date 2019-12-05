import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../form-data.service';
import {AttributesForm} from '../attributes/attributes.form';


@Component({
  selector: 'lib-wsfedattrrelpolicies',
  templateUrl: './wsfedattrrelpolicies.component.html',
  styleUrls: ['./wsfedattrrelpolicies.component.css']
})
export class WsfedattrrelpoliciesComponent implements OnInit {

  @Input()
  control: AttributesForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  attributes(): string[] {
    return this.formData.availableAttributes(this.formData.options.attributeRepositories);
  }

}
