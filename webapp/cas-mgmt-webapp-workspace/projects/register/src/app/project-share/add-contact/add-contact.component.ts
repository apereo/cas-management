import {Component, OnInit} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {DefaultRegisteredServiceContact, UserService} from '@apereo/mgmt-lib';

/**
 * Component for looking up and adding a contact to a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html'
})

export class AddContactComponent implements OnInit {

  private lookupContact = new Subject<string>();

  foundContacts: DefaultRegisteredServiceContact[];
  selectedContact: DefaultRegisteredServiceContact[] = [new DefaultRegisteredServiceContact()];
  i: number;

  constructor(public dialogRef: MatDialogRef<AddContactComponent>,
              public user: UserService) { }

  /**
   * Sets up pipe to find contacts.
   */
  ngOnInit() {
      this.selectedContact[0].name = '';
      this.lookupContact.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(q => this.query(q)),
      ).subscribe(
        (resp: DefaultRegisteredServiceContact[])  => this.foundContacts = resp
      );
  }

  /**
   * Calls back end to match contacts by partial match.
   *
   * @param query - partial string
   */
  private query(query: string) {
    if (query && query !== '' && query.length >= 3) {
      return this.user.lookupContact(query);
    } else {
      return new Observable((observer) => observer.next([]));
    }
  }

  /**
   * Receives text from view to search for contact.
   *
   * @param val - text to match
   * @param i - index of contact in list
   */
  doLookupContact(val: string, i: number) {
    this.i = i;
    this.lookupContact.next(val);
  }

  /**
   * Handles selection of contact.
   *
   * @param sel - MatAutocompleteSelectedEvent
   */
  selection(sel: MatAutocompleteSelectedEvent ) {
    this.selectedContact[this.i] = sel.option.value;
  }

  /**
   * Adds a new contact to the list.
   */
  addContact() {
    const nc = new DefaultRegisteredServiceContact();
    nc.name = '';
    this.selectedContact.push(nc);
  }

  /**
   * Removes conact at passed index.
   *
   * @param i - index of contact to remove.
   */
  removeContact(i: number) {
    this.selectedContact.splice(i, 1);
  }
}
