import {Component, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar, MatTabChangeEvent, MatTabGroup} from '@angular/material';
import {FormArray, FormGroup} from '@angular/forms';
import {DataRecord} from './data';

@Component({
  selector: 'lib-base-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class BaseFormComponent {

  id: string;
  created: false;

  @ViewChild('tabGroup', { static: true })
  tabGroup: MatTabGroup;

  @Input()
  tabs: Array<string[]> = [];

  constructor(public route: ActivatedRoute,
              public router: Router,
              public data: DataRecord,
              public location: Location,
              public snackBar: MatSnackBar) {
  }

  goto(event: MatTabChangeEvent) {
    this.navTo(this.tabs[event.index][0]);
  }

  navTo(tab: string) {
    const route: any[] = [{outlets: {form: [tab]}}];
    this.router.navigate(route, {skipLocationChange: true, relativeTo: this.route, replaceUrl: true});
  }

  validate(): boolean {
    for (const key of Array.from(this.data.formMap.keys())) {
      const frm: FormGroup = this.data.formMap.get(key) as FormGroup;
      if (frm.invalid) {
        this.touch(frm);
        this.tabGroup.selectedIndex = this.tabs.findIndex(entry => entry[0] === key);
        return false;
      }
    }
    return true;
  }

  touch(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach(k => {
      const control = group.get(k);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.touch(control);
      } else {
        if (control.invalid) {
          control.markAsTouched();
        }
      }
    });
  }

  markDirty() {
    for (const key of Array.from(this.data.formMap.keys())) {
      const frm: FormGroup = this.data.formMap.get(key) as FormGroup;
      console.log('marking ' + key + ' as dirty');
      this.makeDirty(frm);
    }
  }

  makeDirty(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach(k => {
      const control = group.get(k);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.makeDirty(control);
      } else {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }

  mapForm(): boolean {
    let touched: boolean = this.created;
    for (const key of Array.from(this.data.formMap.keys())) {
      const form = this.data.formMap.get(key);
      if (form.valid && form.touched) {
        form.mapForm(this.data.service);
        touched = true;
      }
    }
    return touched;
  }

  reset() {
    for (const fg of Array.from(this.data.formMap.values())) {
      fg.reset(fg.reset());
    }
  }

  touched(): boolean {
    for (const fg of Array.from(this.data.formMap.values())) {
      if (fg.touched) {
        return true;
      }
    }
    return false;
  }

  dirty(): boolean {
    if (this.data.formMap) {
      for (const fg of Array.from(this.data.formMap.values())) {
        if (fg.dirty) {
          return true;
        }
      }
    }
    return false;
  }
}
