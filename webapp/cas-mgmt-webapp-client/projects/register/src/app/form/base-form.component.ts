import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormGroup} from '@angular/forms';
import {SubmitComponent} from '../project-share/submit/submit.component';
import {
  AbstractRegisteredService,
  DataRecord,
  RegexRegisteredService,
  MgmtFormControl,
  SpinnerService
} from 'mgmt-lib';
import {RegisterService} from '../core/register.servivce';
import {RegisterForm} from './register-form';

@Component({
  selector: 'app-register-base-form',
  template: ''
})
export class BaseFormComponent implements OnInit {

  public form: RegisterForm;

  constructor(public data: DataRecord,
              public registerService: RegisterService,
              public router: Router,
              public route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public spinner: SpinnerService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: AbstractRegisteredService }) => {
        if (data.resp) {
          this.data.service = data.resp;
          this.form = new RegisterForm(this.data);
        }
      });
  }

  save() {
    if (this.form.touched) {
      if (this.validate() && this.mapForm()) {
        this.saveInternal();
      } else {
        this.showErrors();
        this.snackBar.open(
          'Please correct errors before service can be submitted.',
          'Dismiss',
          {
            duration: 5000
          }
        );
      }

    }
  }

  saveInternal() {

  }

  showErrors() {

  }

  validate(): boolean {
    if (this.form.invalid) {
      this.touch(this.form as FormGroup);
      return false;
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

  mapForm(): boolean {
    let touched = false;
    if (this.form.invalid && this.form.touched) {
      this.form.mapForm(this.data.service);
      touched = true;
    }
    return touched;
  }

  showSubmit() {
    const dialogRef = this.dialog.open(SubmitComponent, {
      data: ['changeService', ''],
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['pending']);
    });
  }

  validateRegex(pattern): boolean {
    try {
      if (pattern === '') {
        return false;
      }
      const patt = new RegExp(pattern);
      return true;
    } catch (e) {
      console.log('Failed regex');
    }
    return false;
  }

  serviceType(): MgmtFormControl {
    return new MgmtFormControl(RegexRegisteredService.cName);
  }
}
