import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {DataRecord} from '../../data';
import {FormDataService} from '../../../form-data.service';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-value-types',
  templateUrl: './value-types.component.html',
  styleUrls: ['./value-types.component.css']
})
export class ValueTypesComponent implements OnInit {

  @Input()
  control: FormGroup;

  selectedRow;

  entries: FormArray;

  constructor(public data: DataRecord, public formData: FormDataService) {
  }

  ngOnInit() {
    this.entries = this.control.get('valueTypes') as FormArray;
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
