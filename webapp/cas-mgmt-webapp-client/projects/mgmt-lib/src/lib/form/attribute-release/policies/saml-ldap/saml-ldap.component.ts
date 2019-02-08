import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {FormArray, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

@Component({
  styleUrls: ['./saml-ldap.component.css'],
  selector: 'lib-saml-ldap',
  templateUrl: './saml-ldap.component.html'
})
export class SamlLdapComponent implements OnInit {

  @Input()
  control: FormGroup;

  selectedRow: number;

  entries: FormArray;

  options: any[];

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.entries = this.control.get('attributes') as FormArray;
    this.options = [];
    Object.entries(this.formData.options.samlIdpFriendlyNames).forEach(entry => {
      this.options.push({key: entry[1], value: entry[0]});
    });
    setTimeout(() => {
      if (this.entries.length > 0) {
        this.entries.controls.forEach(c => {
          const opt: any = c.get('key').value;
          const index = this.options.findIndex((val) => val.key === opt.key);
          const found = this.options[index];
          c.get('key').setValue(found);
        });
      }
    }, 10);
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

  selection(sel: MatAutocompleteSelectedEvent) {
    setTimeout(() => {
      this.entries.at(this.selectedRow).get('value').setValue(sel.option.value.key);
    }, 10);
  }

  displayWith(opt): string {
    return opt ? opt.value : '';
  }

}
