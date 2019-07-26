import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-saml-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributeNameFormatsComponent implements OnInit {

  @Input()
  control: FormGroup;

  selectedRow;

  entries: FormArray;

  display: Function;

  constructor(public data: DataRecord, public formData: FormDataService) {
    this.display = (format?: string): string | undefined =>
        format ? formData.options.samlAttributeNameFormats
          .find(v => v.value === format).display : undefined;
  }


  ngOnInit() {
    this.entries = this.control.get('nameFormats') as FormArray;
  }

  addRow() {
    this.entries.push(new FormGroup({
      key: new MgmtFormControl(null),
      value: new MgmtFormControl(null)
    }));
  }

  delete(row: number) {
    this.entries.removeAt(row);
    this.control.markAsTouched();
  }
}
