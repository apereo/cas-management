import {Component, Input, OnInit} from '@angular/core';
import {DefaultRegisteredServiceContact} from '@apereo/mgmt-lib/src/lib/model';
import {UserService, SpinnerService, AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {ContactsForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component that displays and updates a registered contact.
 *
 * @author Travis Schmidt
 */
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

  /**
   * Initializes the component by setting up a pipe for searching for contacts by name.
   */
  ngOnInit() {
    this.selectedTab = 0;
    this.lookupContact.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(q => this.query(q))
    ).subscribe(
      (resp: DefaultRegisteredServiceContact[])  => this.foundContacts = resp,
      () => this.foundContacts = []
    );
  }

  /**
   * Queries the server for contacts that match the partial name entered.
   *
   * @param query - partial string to match
   */
  private query(query: string) {
    if (query && query !== '' && query.length >= 3) {
      this.spinner.start('Searching');
      return this.user.lookupContact(query)
        .pipe(finalize(() => this.spinner.stop()));
    } else {
      return new Observable((observer) => observer.next([]));
    }
  }

  /**
   * Receives text form the input and passes to subject.
   *
   * @param val - entered text
   */
  doLookupContact(val: string) {
    if (this.appConfig.config.contactLookup) {
      this.lookupContact.next(val);
    }
  }

  /**
   * Handles the selection of a contact and fills remaining contact information fields.
   *
   * @param sel - autocomplete selection
   */
  selection(sel: MatAutocompleteSelectedEvent ) {
    const selection = this.foundContacts[+sel.option.value];
    const contact = this.form.rowAt(this.selectedTab);
    contact.email.setValue(selection.email);
    contact.phone.setValue(selection.phone);
    contact.department.setValue(selection.department);
    contact.name.setValue(selection.name);
    this.foundContacts = null;
  }

  /**
   * Adds a contact to the list of contacts for this service.
   *
   * @param contact - registered contact
   */
  addContact(contact?: DefaultRegisteredServiceContact) {
    this.form.addRow(contact || new DefaultRegisteredServiceContact());
    this.selectedTab = this.form.length - 1;
  }

  /**
   * Deletes the currently selected contact.
   */
  deleteContact() {
    if (this.selectedTab > -1) {
      this.form.removeAt(this.selectedTab);
    }
  }

  /**
   * Returns the header to use for the contact.
   *
   * @param index - index of tab
   */
  getTabHeader(index: number) {
    return index + 1;
  }

  errors(): any[] {
    return [
      {key: 'email', display: 'You have entered an invalid email address'}
    ];
  }

}
