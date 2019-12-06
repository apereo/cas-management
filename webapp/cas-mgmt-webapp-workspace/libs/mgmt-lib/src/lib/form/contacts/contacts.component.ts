import {Component, Input, OnInit} from '@angular/core';
import {DefaultRegisteredServiceContact} from 'domain-lib';
import {UserService, SpinnerService, AppConfigService} from 'shared-lib';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {ContactsForm} from './contacts.form';

@Component({
  selector: 'lib-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
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
  form: ContactsForm;

  ngOnInit() {
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
    const selection = this.foundContacts[+sel.option.value];
    const contact = this.form.rowAt(this.selectedTab);
    contact.email.setValue(selection.email);
    contact.phone.setValue(selection.phone);
    contact.department.setValue(selection.department);
    contact.name.setValue(selection.name);
    this.foundContacts = null;
  }

  contactName(contact?: DefaultRegisteredServiceContact): string | undefined {
    return contact ? contact.name : undefined;
  }

  addContact(contact?: DefaultRegisteredServiceContact) {
    this.form.addRow(contact || new DefaultRegisteredServiceContact());
    this.selectedTab = this.form.length - 1;
  }

  deleteContact() {
    if (this.selectedTab > -1) {
      this.form.removeAt(this.selectedTab);
    }
  }

  getTabHeader(index: number) {
    return index + 1;
  }

}
