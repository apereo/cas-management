import {Component, Input, OnInit} from '@angular/core';
import {Data} from '../data';
import {Messages} from '../../messages';
import {DefaultRegisteredServiceContact, RegisteredServiceContact} from '../../../domain/contact';
import {NgForm} from '@angular/forms';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  selectedTab: number;

  @Input()
  form: NgForm;

  contacts: RegisteredServiceContact[];
  original: RegisteredServiceContact[];

  constructor(public messages: Messages,
              private userService: UserService,
              public data: Data) {
    this.contacts = data.service.contacts;
    this.original = data.original && data.original.contacts;
  }

  ngOnInit() {
    if (!this.contacts || this.contacts.length == 0) {
      const contact: DefaultRegisteredServiceContact = new DefaultRegisteredServiceContact();
      contact.id = 0;
      contact.name = this.userService.user.firstName + " " + this.userService.user.familyName;
      contact.email = this.userService.user.email;
      contact.phone = this.userService.user.phone;
      contact.department = this.userService.user.department;
      this.contacts = [];
      this.contacts.push(contact);
      this.data.service.contacts = this.contacts;
    }
    this.selectedTab = 0;
  }

  addContact() {
    this.contacts.push(new DefaultRegisteredServiceContact());
    this.selectedTab = this.contacts.length - 1;
    setTimeout(() => {
        this.form.resetForm();
    }, 100);
  }

  deleteContact() {
    if (this.selectedTab > -1) {
      this.contacts.splice(this.selectedTab, 1);
    }
  }

  getTabHeader(contact: DefaultRegisteredServiceContact) {
    return contact.name ? contact.name : this.contacts.indexOf(contact) + 1;
  }

}
