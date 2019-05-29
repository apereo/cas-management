import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import {FormArray, FormGroup} from '@angular/forms';
import {OAuthForm} from '../oauth-form';
import {DataRecord,
  SpinnerService,
  OAuthRegisteredService,
  MgmtFormControl
} from 'mgmt-lib';
import {OAuthService} from '../../core/oauth.service';
import {SubmitComponent} from '../../project-share/submit/submit.component';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  @ViewChild(MatTabGroup)
  tabs: MatTabGroup;

  public form: OAuthForm;

  public keys = ['name', 'family_name', 'given_name', 'nickname', 'uid',
    'email', 'telephoneNumber', 'street', 'city', 'postalCode', 'st', 'c'];

  constructor(public data: DataRecord,
              public oauthService: OAuthService,
              public router: Router,
              public route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public spinner: SpinnerService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: OAuthRegisteredService }) => {
        if (data.resp) {
          this.data.service = data.resp;
          this.form = new OAuthForm(this.data);
        }
      });
  }

  save() {
    if (!this.form.touched) {
      return;
    }
    if (this.validate()) {
      this.mapForm();
      if (this.data.service.id > -1) {
        this.saveInternal();
      } else {
        this.submit();
      }
    } else {
      this.showErrors();
      this.snackBar.open(
        'Please correct errors before service can be submitted.',
        'Dismiss',
        { duration: 5000 }
      );
    }
  }

  saveInternal() {
    this.spinner.start();
    this.oauthService.saveService(this.data.service as OAuthRegisteredService, this.route.snapshot.params['id'])
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.showSubmit());
  }

  submit() {
    this.spinner.start();
    this.oauthService.submitService(this.data.service as OAuthRegisteredService)
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
    this.form.mapForm(this.data.service as OAuthRegisteredService);
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
    return new MgmtFormControl(OAuthRegisteredService.cName);
  }

  generateId() {
    this.oauthService.generateId().subscribe(id => {
      this.form.get('oauth').get('clientId').setValue(id);
    });
  }

  generateSecret() {
    this.oauthService.generateSecret().subscribe(secret => {
      this.form.get('oauth').get('clientSecret').setValue(secret);
    });
  }

}
