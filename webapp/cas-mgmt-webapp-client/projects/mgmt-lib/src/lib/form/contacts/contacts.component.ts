import {Component, forwardRef, OnInit} from '@angular/core';
import {DefaultRegisteredServiceContact, RegisteredServiceContact} from '../../domain/contact';
import {AbstractControl, ControlContainer, FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {HasControls} from '../has-controls';

@Component({
  selector: 'lib-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ContactsComponent)
  }]
})
export class ContactsComponent extends HasControls implements OnInit {

  selectedTab: number;

  constructor(private userService: UserService,
              public data: DataRecord) {
    super();
  }

  contactsGroup: FormGroup;
  contactsArray: FormArray;

  getControls(): Map<string, AbstractControl> {
    let c: Map<string, AbstractControl> = new Map();
    c.set('contacts', this.contactsArray);
    return c;
  }

  ngOnInit() {
    this.contactsArray = new FormArray([]);
    this.contactsGroup = new FormGroup({
      contacts: this.contactsArray
    })
    //this.contactsGroup = new FormGroup({contacts: this.contacts});
    if (!this.userService.user.administrator
        && (!this.data.service.contacts || this.data.service.contacts.length === 0)) {
      const contact: DefaultRegisteredServiceContact = new DefaultRegisteredServiceContact();
      contact.id = 0;
      contact.name = this.userService.user.firstName + ' ' + this.userService.user.familyName;
      contact.email = this.userService.user.email;
      contact.phone = this.userService.user.phone;
      contact.department = this.userService.user.department;
      this.contactsArray.push(this.createContactGroup(contact));
    } else if (this.data.service.contacts) {
      for (let contact of this.data.service.contacts) {
        this.contactsArray.push(this.createContactGroup(contact));
      }
    }
    this.selectedTab = 0;
  }

  addContact() {
    this.contactsArray.push(this.createContactGroup(new DefaultRegisteredServiceContact()));
    this.selectedTab = this.data.service.contacts.length - 1;
    setTimeout(() => {
        // this.form.resetForm();
    }, 100);
  }

  deleteContact() {
    if (this.selectedTab > -1) {
      this.contactsArray.removeAt(this.selectedTab);
    }
  }

  getTabHeader(index) {
    return index + 1;//this.data.service.contacts[index].name ? this.data.service.contacts[index].name : index + 1;
  }

  createContactGroup(contact: RegisteredServiceContact): FormGroup {
    return new FormGroup({
      id: new MgmtFormControl(contact.id),
      name: new MgmtFormControl(contact.name, '', Validators.required),
      email: new MgmtFormControl(contact.email, '', Validators.required),
      phone: new MgmtFormControl(contact.phone),
      department: new MgmtFormControl(contact.department)
    })
  }

}
