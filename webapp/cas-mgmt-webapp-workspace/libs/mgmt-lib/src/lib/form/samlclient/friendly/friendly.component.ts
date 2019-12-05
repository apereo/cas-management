import {Component, Input, OnInit} from '@angular/core';
import {DataRecord} from '../../data';
import {FormDataService} from '../../../form-data.service';
import {AttributesForm} from '../../attributes/attributes.form';

@Component({
  selector: 'lib-friendly',
  templateUrl: './friendly.component.html',
  styleUrls: ['./friendly.component.css']
})
export class FriendlyComponent implements OnInit {

  @Input()
  form: AttributesForm;

  selectedRow;

  constructor(public data: DataRecord, public formData: FormDataService) {
  }

  ngOnInit() {
  }

  addRow() {
    this.form.addRow();
  }

  delete(row: number) {
    this.form.removeAt(row);
    this.form.markAsTouched();
  }

}
