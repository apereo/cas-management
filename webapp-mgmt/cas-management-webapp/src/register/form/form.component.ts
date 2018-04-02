import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../../app/messages';
import {Data} from '../../app/form/data';
import {AbstractRegisteredService, RegexRegisteredService} from '../../domain/registered-service';
import {RegisterService} from '../register.servivce';
import {MatDialog, MatSnackBar, MatTabGroup} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultRegisteredServiceMultifactorPolicy} from '../../domain/multifactor';
import {NgForm} from '@angular/forms';
import {SubmitComponent} from '../submit/submit.component';

@Component({
  selector: 'register-form',
  templateUrl: './form.component.html'
})
export class RegisterFormComponent implements OnInit {

  requiresDuo: boolean;

  @ViewChild(MatTabGroup)
  tabs: MatTabGroup

  @ViewChild('editForm')
  form: NgForm;

  constructor(public messages: Messages,
              public data: Data,
              public registerService: RegisterService,
              public router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    data.service = new RegexRegisteredService();
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: AbstractRegisteredService }) => {
        if (data.resp) {
          this.data.service = data.resp;
          this.requiresDuo = this.data.service.multifactorPolicy &&
            this.data.service.multifactorPolicy.multifactorAuthenticationProviders.indexOf('mfa-duo') > -1

        }
      });
  }

  changed(): boolean {
    return this.form.dirty;
  }

  changeDuo(){
    if (this.requiresDuo) {
      this.data.service.multifactorPolicy = new DefaultRegisteredServiceMultifactorPolicy();
      this.data.service.multifactorPolicy.multifactorAuthenticationProviders = ["mfa-duo"];
      this.data.service.multifactorPolicy.failureMode = "OPEN";
    } else {
      this.data.service.multifactorPolicy = null;
    }
  }

  save() {
    if (this.validateForm()) {
      this.registerService.save(this.data.service)
        .then(resp => this.showSubmit());
    } else {
      this.snackBar.open("Please correct errors before submitting form", "Dismiss", {
        duration: 5000
      });
    }
  }

  showSubmit() {
    const dialogRef = this.dialog.open(SubmitComponent, {
      data: true,
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

  validateDomain = function() {
    return function (service: string): boolean {
      const domainExtractor = new RegExp('^\\^?https?\\??://([^:/]+)');
      const domainPattern = new RegExp('^[a-z0-9-.]*$');

      try {
        const domain = domainExtractor.exec(service);
        if (domain != null) {
          return domainPattern.test(domain[1]);
        }
      } catch (e) {
        console.log('Failed Domain parse');
      }
      return false;
    };
  }

  validateForm(): boolean {
    const data = this.data.service;

    if (this.form.controls['serviceId'].errors) {
      this.tabs.selectedIndex = 0;
      return false;
    }

    if (this.form.controls['serviceName'].errors) {
      this.tabs.selectedIndex = 0;
      return false;
    }

    for (let i = 0; i < this.data.service.contacts.length; i++) {
      if (this.form.controls['contact'+i].status === 'INVALID') {
        this.tabs.selectedIndex = 1;
        return false;
      }
    }

    if (this.form.controls["logoutUrl"].errors) {
      this.tabs.selectedIndex = 2;
      return false;
    }

    return true;
  }
}