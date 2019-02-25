import {Component, Input, OnInit} from '@angular/core';
import {DefaultRegisteredServiceContact, RegisteredServiceContact} from '../../domain/contact';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {SpinnerService} from '../../spinner/spinner.service';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {AppConfigService} from '../../app-config.service';

@Component({
  selector: 'lib-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  selectedTab: number;

  private lookupContact = new Subject<string>();
  foundContacts: DefaultRegisteredServiceContact[];

  constructor(private user: UserService,
              private spinner: SpinnerService,
              private appConfig: AppConfigService) {
  }

  @Input()
  control: FormGroup;
  contactsArray: FormArray;

  ngOnInit() {
    this.contactsArray = this.control.get('contacts') as FormArray;
    this.selectedTab = 0;

    this.lookupContact.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query && query !== '' && query.length >= 3) {
          this.spinner.start('Searching');
          return this.user.lookupContact(query)
            .pipe(finalize(() => this.spinner.stop()));
        } else {
          return new Observable((observer) => observer.next([]));
        }
      })
    ).subscribe((resp: DefaultRegisteredServiceContact[])  => this.foundContacts = resp,
      error => this.foundContacts = []);
  }

  doLookupContact(val: string) {
    if (this.appConfig.config.contactLookup) {
      this.lookupContact.next(val);
    }
  }

  selection(sel: MatAutocompleteSelectedEvent ) {
    const selection = this.foundContacts.filter(c => c.name === sel.option.value)[0];
    const contact = this.contactsArray.at(this.selectedTab);
    contact.get('email').setValue(selection.email);
    contact.get('phone').setValue(selection.phone);
    contact.get('department').setValue(selection.department);
    contact.get('name').setValue(selection.name);
    this.foundContacts = null;
  }

  contactName(contact?: DefaultRegisteredServiceContact): string | undefined {
    return contact ? contact.name : undefined;
  }

  addContact(contact?: DefaultRegisteredServiceContact) {
    this.contactsArray.push(this.createContactGroup(contact || new DefaultRegisteredServiceContact()));
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
      email: new MgmtFormControl(contact.email, '', [Validators.required, Validators.email]),
      phone: new MgmtFormControl(contact.phone),
      department: new MgmtFormControl(contact.department)
    });
  }

}
