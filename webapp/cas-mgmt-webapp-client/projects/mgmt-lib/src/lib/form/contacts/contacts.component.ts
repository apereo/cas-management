import {Component, Input, OnInit} from '@angular/core';
import {DefaultRegisteredServiceContact, RegisteredServiceContact} from '../../domain/contact';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  selectedTab: number;

  constructor(private userService: UserService) {
  }

  @Input()
  control: FormGroup;
  contactsArray: FormArray;

  ngOnInit() {
    this.contactsArray = this.control.get('contacts') as FormArray;
    this.selectedTab = 0;
  }

  addContact() {
    this.contactsArray.push(this.createContactGroup(new DefaultRegisteredServiceContact()));
    this.selectedTab = this.contactsArray.length - 1;
  }

  deleteContact() {
    if (this.selectedTab > -1) {
      this.contactsArray.removeAt(this.selectedTab);
    }
  }

  getTabHeader(index: number) {
    return index + 1;
  }

  createContactGroup(contact: RegisteredServiceContact): FormGroup {
    return new FormGroup({
      name: new MgmtFormControl(contact.name, '', Validators.required),
      email: new MgmtFormControl(contact.email, '', Validators.required),
      phone: new MgmtFormControl(contact.phone),
      department: new MgmtFormControl(contact.department)
    })
  }

}
