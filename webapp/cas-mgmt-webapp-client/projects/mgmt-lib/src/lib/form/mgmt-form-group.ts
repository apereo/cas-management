import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MgmtFormGroup {

  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({});
  }

  getFormGroup() {
    return this.formGroup;
  }

}
