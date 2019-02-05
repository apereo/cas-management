import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar, MatTabGroup} from '@angular/material';
import {finalize} from 'rxjs/operators';
import {FormArray, FormGroup} from '@angular/forms';
import {SubmitComponent} from '../../project-share/submit/submit.component';
import {OidcForm} from '../oidc-form';
import {
  DataRecord,
  SpinnerService,
  OidcRegisteredService,
  MgmtFormControl
} from 'mgmt-lib';
import {OidcService} from '../../core/oidc.service';

@Component({
  selector: 'app-oidc',
  templateUrl: './oidc.component.html',
  styleUrls: ['./oidc.component.css']
})
export class OidcComponent implements OnInit {

  form: OidcForm;

  constructor(public data: DataRecord,
              public oidcService: OidcService,
              public router: Router,
              public route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public spinner: SpinnerService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: OidcRegisteredService }) => {
        if (data.resp) {
          this.data.service = data.resp;
          this.form = new OidcForm(this.data);
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
        { duration: 5000 }
      );
    }
  }

  @ViewChild(MatTabGroup)
  tabs: MatTabGroup;

  saveInternal() {
    this.spinner.start();
    this.oidcService.saveService(this.data.service as OidcRegisteredService, this.route.snapshot.params['id'])
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.showSubmit());
  }

  showErrors() {
    if (this.form.get('basics').invalid) {
      this.tabs.selectedIndex = 0;
    } else if (this.form.get('oauth').invalid) {
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
    this.form.mapForm(this.data.service as OidcRegisteredService);
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
    return new MgmtFormControl(OidcRegisteredService.cName);
  }


}
