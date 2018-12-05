import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {FormDataService} from '../../form-data.service';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-samlservicespane',
  templateUrl: './samlservicespane.component.html',
  styleUrls: ['./samlservicespane.component.css']
})
export class SamlservicespaneComponent implements OnInit {

  @Input()
  control: FormGroup;
  selectedRow: number;
  nameArray: FormArray;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.nameArray = this.control.get('nameIds') as FormArray;
  }

  addRow() {
    this.nameArray.push(new FormGroup({
      key: new MgmtFormControl(null),
      value: new MgmtFormControl(null)
    }));
  }

  delete(row: number) {
    this.nameArray.removeAt(row);
    this.control.markAsTouched();
  }
}

