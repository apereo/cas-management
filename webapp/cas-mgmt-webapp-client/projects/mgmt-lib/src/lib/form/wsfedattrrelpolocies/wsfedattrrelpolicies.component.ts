import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../form-data.service';
import {FormArray, FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';


@Component({
  selector: 'lib-wsfedattrrelpolicies',
  templateUrl: './wsfedattrrelpolicies.component.html',
  styleUrls: ['./wsfedattrrelpolicies.component.css']
})
export class WsfedattrrelpoliciesComponent implements OnInit {

  @Input()
  control: FormGroup;

  attributeArray: FormArray;

  selectedRow: number;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.attributeArray = this.control.get('allowedAttributes') as FormArray;
  }

  addRow() {
    this.attributeArray.push(new FormGroup({
      key: new MgmtFormControl(null),
      value: new MgmtFormControl(null)
    }));
  }

  delete(row: number) {
    this.attributeArray.removeAt(row);
    this.control.markAsTouched();
  }

  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }

}
