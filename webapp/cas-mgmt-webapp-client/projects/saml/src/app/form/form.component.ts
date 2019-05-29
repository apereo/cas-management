import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import {finalize} from 'rxjs/operators';
import {FormArray, FormGroup} from '@angular/forms';
import {
  DataRecord,
  SpinnerService,
  SamlRegisteredService,
  MgmtFormControl
} from 'mgmt-lib';
import {SamlService} from '../core/saml.service';
import {SamlForm} from './saml-form';
import {SubmitComponent} from '../project-share/submit/submit.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild(MatTabGroup, {static: true})
  tabs: MatTabGroup;

  public form: SamlForm;

  constructor(public data: DataRecord,
              public samlService: SamlService,
              public router: Router,
              public route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public spinner: SpinnerService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: SamlRegisteredService }) => {
        if (data.resp) {
          this.data.service = data.resp;
          this.form = new SamlForm(this.data);
          this.form.markAsDirty();
        }
      });
  }

  save() {
    if (!this.form.touched) {
      return;
    }
    if (this.validate()) {
      this.mapForm();
      this.saveInternal();
    } else {
      this.showErrors();
      this.snackBar.open(
        'Please correct errors before service can be submitted.',
        'Dismiss',
        {duration: 5000}
      );
    }
  }

  saveInternal() {
    this.spinner.start();
    this.samlService.saveService(this.data.service as SamlRegisteredService, this.route.snapshot.params['id'])
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.showSubmit());
  }

  showErrors() {
    if (this.form.get('basics').invalid) {
      this.tabs.selectedIndex = 0;
    } else if (this.form.get('saml').invalid) {
      this.tabs.selectedIndex = 1;
    } else if (this.form.get('attributes').invalid) {
      this.tabs.selectedIndex = 2;
    } else if (this.form.get('contacts').invalid) {
      this.tabs.selectedIndex = 3;
    } else if (this.form.get('advanced').invalid) {
      this.tabs.selectedIndex = 4;
    }
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

  mapForm() {
    this.form.mapForm(this.data.service as SamlRegisteredService);
  }

  showSubmit() {
    const dialogRef = this.dialog.open(SubmitComponent, {
      data: ['changeService', ''],
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['services']);
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
    return new MgmtFormControl(SamlRegisteredService.cName);
  }

}
