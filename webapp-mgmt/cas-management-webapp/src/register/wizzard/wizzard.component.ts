import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../../app/messages';
import {Data} from '../../app/form/data';
import {RegexRegisteredService} from '../../domain/registered-service';
import {UserService} from '../../app/user.service';
import {DefaultRegisteredServiceContact} from '../../domain/contact';
import {RegisterService} from '../register.servivce';
import {MatDialog, MatHorizontalStepper, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {FormService} from '../../app/form/form.service';
import {DefaultRegisteredServiceMultifactorPolicy} from '../../domain/multifactor';
import {UserProfile} from '../../domain/user-profile';
import {NgForm} from '@angular/forms';
import {RejectComponent} from '../../app/reject/reject.component';
import {SubmitComponent} from '../submit/submit.component';

@Component({
  selector: 'register-wizzard',
  templateUrl: './wizzard.component.html'
})
export class WizzardComponent implements OnInit {

  requiresDuo: boolean;

  @ViewChild(MatHorizontalStepper)
  stepper: MatHorizontalStepper;

  @ViewChild('wizzardForm')
  form: NgForm;

  constructor(public messages: Messages,
              public data: Data,
              public userService: UserService,
              public registerService: RegisterService,
              public formService: FormService,
              public router: Router,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    data.service = new RegexRegisteredService();
  }

  ngOnInit() {
    this.formService.formData().then(resp => {
      this.data.formData = resp;
    });
    const contact: DefaultRegisteredServiceContact = new DefaultRegisteredServiceContact();
    contact.id = 0;
    contact.name = this.userService.user.firstName + " " + this.userService.user.familyName;
    contact.email = this.userService.user.email;
    contact.phone = this.userService.user.phone;
    contact.department = this.userService.user.department;
    this.data.service.contacts = [];
    this.data.service.contacts.push(contact);
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

  submitForm() {
    this.data.invalidRegEx = false;
    if (this.validateForm()) {
      this.registerService.submitService(this.data.service)
        .then(resp => this.showSubmit());
    } else {
      this.snackBar.open("Please correct errors before service can be submitted.", "Dismiss", {
        duration: 5000
      });
    }
  }

  showSubmit() {
    const dialogRef = this.dialog.open(SubmitComponent, {
      data: false,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['services']);
    });
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
      this.stepper.selectedIndex = 0;
      return false;
    }

    if (this.form.controls['serviceName'].errors) {
      this.stepper.selectedIndex = 0;
      return false;
    }

    for (let i = 0; i < this.data.service.contacts.length; i++) {
      if (this.form.controls['contact'+i].status === 'INVALID') {
        this.stepper.selectedIndex = 1;
        return false;
      }
    }

    if (this.form.controls['logoutUrl'].errors) {
      this.stepper.selectedIndex = 2;
      return false;
    }

    return true;
  }

}