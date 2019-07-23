import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {DataRecord} from '../../data';
import {FormDataService} from '../../../form-data.service';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-friendly',
  templateUrl: './friendly.component.html',
  styleUrls: ['./friendly.component.css']
})
export class FriendlyComponent implements OnInit {

  @Input()
  control: FormGroup;

  selectedRow;

  entries: FormArray;

  constructor(public data: DataRecord, public formData: FormDataService) {
  }

  ngOnInit() {
    this.entries = this.control.get('friendlyNames') as FormArray;
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
