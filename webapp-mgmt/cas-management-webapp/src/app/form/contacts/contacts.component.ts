import {Component, Input, OnInit} from '@angular/core';
import {Data} from '../data';
import {Messages} from '../../messages';
import {DefaultRegisteredServiceContact, RegisteredServiceContact} from '../../../domain/contact';
import {NgForm} from '@angular/forms';

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
              public data: Data) {
    this.contacts = data.service.contacts;
    this.original = data.original && data.original.contacts;
  }

  ngOnInit() {
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
