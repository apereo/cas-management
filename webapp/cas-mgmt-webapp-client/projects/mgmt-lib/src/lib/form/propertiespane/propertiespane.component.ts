import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormDataService} from '../../form-data.service';
import {FormArray, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'lib-propertiespane',
  templateUrl: './propertiespane.component.html',
  styleUrls: ['./propertiespane.component.css']
})
export class PropertiespaneComponent implements OnInit {
  @Input()
  control: FormGroup;

  selectedRow: number;

  entries: FormArray;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.entries = this.control.get('properties') as FormArray;
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

  selection(event: MatAutocompleteSelectedEvent) {
    const index = event.source.options.toArray().indexOf(event.option);
    const val = this.formData.options.registeredServiceProperties[index].value;
    this.entries.at(this.selectedRow).get('value').setValue(val);
  }
}
