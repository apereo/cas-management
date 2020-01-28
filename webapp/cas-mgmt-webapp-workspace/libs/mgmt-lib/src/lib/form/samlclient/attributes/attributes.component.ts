import {Component, Input, OnInit} from '@angular/core';
import {DataRecord} from '../../data.model';
import {FormDataService} from '../../../form-data.service';
import {AttributesForm} from '../../attributes/attributes.form';

@Component({
  selector: 'lib-saml-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributeNameFormatsComponent implements OnInit {

  @Input()
  form: AttributesForm;

  selectedRow;

  display;

  constructor(public data: DataRecord, public formData: FormDataService) {
    this.display = (format?: string): string | undefined =>
        format ? formData.options.samlAttributeNameFormats
          .find(v => v.value === format).display : undefined;
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
