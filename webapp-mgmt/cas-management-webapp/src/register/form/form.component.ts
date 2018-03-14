import {Component, OnInit} from '@angular/core';
import {Messages} from '../../app/messages';
import {Data} from '../../app/form/data';
import {RegexRegisteredService} from '../../domain/registered-service';
import {UserService} from '../../app/user.service';
import {DefaultRegisteredServiceContact, RegisteredServiceContact} from '../../domain/contact';
import {RegisterService} from '../register.servivce';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {FormService} from '../../app/form/form.service';
import {DefaultRegisteredServiceMultifactorPolicy} from '../../domain/multifactor';

@Component({
  selector: 'register-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  requiresDuo: boolean;

  constructor(public messages: Messages,
              public data: Data,
              public userService: UserService,
              public registerService: RegisterService,
              public formService: FormService,
              public router: Router) {
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
    this.registerService.submitService(this.data.service)
      .then(resp => this.router.navigate(['submitted']));
  }

}