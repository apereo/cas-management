import {Component, OnInit} from '@angular/core';
import {DefaultRegisteredServiceContact} from '../../domain/contact';
import {ControlContainer, NgForm} from '@angular/forms';
import {UserService} from '../../user.service';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class ContactsComponent implements OnInit {

  selectedTab: number;

  foundContacts: DefaultRegisteredServiceContact[];

  constructor(private userService: UserService,
              public data: DataRecord) { }

  ngOnInit() {
    if (!this.userService.user.administrator
        && (!this.data.service.contacts || this.data.service.contacts.length === 0)) {
      const contact: DefaultRegisteredServiceContact = new DefaultRegisteredServiceContact();
      contact.id = 0;
      contact.name = this.userService.user.firstName + ' ' + this.userService.user.familyName;
      contact.email = this.userService.user.email;
      contact.phone = this.userService.user.phone;
      contact.department = this.userService.user.department;
      this.data.service.contacts = [];
      this.data.service.contacts.push(contact);
    }
    this.selectedTab = 0;
  }

  addContact() {
    if (!this.data.service.contacts) {
      this.data.service.contacts = [];
    }
    this.data.service.contacts.push(new DefaultRegisteredServiceContact());
    this.selectedTab = this.data.service.contacts.length - 1;
    setTimeout(() => {
        // this.form.resetForm();
    }, 100);
  }

  deleteContact() {
    if (this.selectedTab > -1) {
      this.data.service.contacts.splice(this.selectedTab, 1);
    }
  }

  getTabHeader(contact: DefaultRegisteredServiceContact) {
    return contact.name ? contact.name : this.data.service.contacts.indexOf(contact) + 1;
  }

}
