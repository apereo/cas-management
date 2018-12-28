import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SubmitComponent} from '../project-share/submit/submit.component';
import {debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs/index';
import {BreakpointObserver} from '@angular/cdk/layout';
import {
  DefaultRegisteredServiceContact,
  LookupItem,
  PaginatorComponent,
  UserService,
  SpinnerService
} from 'mgmt-lib';
import {AddContactComponent} from '../project-share/add-contact/add-contact.component';
import {RegisterService} from '../core/register.servivce';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {
  domain: String;
  selectedItem: LookupItem;
  dataSource: MatTableDataSource<LookupItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'contacts'];
  bulk = false;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  @ViewChild(MatSort) sort: MatSort;

  private searchText = new Subject<string>();
  private searchContact = new Subject<string>();
  private lookupContact = new Subject<string>();

  foundContacts: DefaultRegisteredServiceContact[];
  selectedContact: DefaultRegisteredServiceContact;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: RegisterService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public user: UserService,
              public breakObserver: BreakpointObserver,
              public spinner: SpinnerService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.searchText.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((domain: string) => {
        if (domain && domain !== '') {
          this.spinner.start('Searching');
          return this.service.lookUp(domain)
            .pipe(finalize(() => this.spinner.stop()));
        } else {
          return Observable.create((observer) => observer.next([]));
        }
      })
    ).subscribe((resp: LookupItem[])  => this.dataSource.data = resp);

    this.searchContact.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((contact: string) => {
        if (contact && contact !== '') {
          this.spinner.start('Searching');
          return this.service.lookUpByContact(contact)
            .pipe(finalize(() => this.spinner.stop()));
        } else {
          return Observable.create((observer) => observer.next([]));
        }
      })
    ).subscribe((resp: LookupItem[])  => this.dataSource.data = resp);

    this.lookupContact.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query && query !== '' && query.length >= 3) {
          this.spinner.start('Searching');
          return this.user.lookupContact(query)
            .pipe(finalize(() => this.spinner.stop()));
        } else {
          return Observable.create((observer) => observer.next([]));
        }
      })
    ).subscribe((resp: DefaultRegisteredServiceContact[])  => this.foundContacts = resp);

    this.breakObserver.observe(['(max-width: 499px)'])
      .subscribe(r => {
        if (r.matches) {
          this. displayedColumns = ['actions', 'serviceId'];
        } else {
          this. displayedColumns = ['actions', 'name', 'serviceId', 'contacts'];
        }
      });
  }

  doLookup(searchBy: string, val: string) {
    if (searchBy === 'contact') {
      this.searchContact.next(val);
    } else {
      this.searchText.next(val);
    }
  }

  doLookupContact(val: string) {
    this.lookupContact.next(val);
  }

  selection(sel: MatAutocompleteSelectedEvent ) {
    const val = sel.option.value;
    this.selectedContact = val;
    this.doLookup('contact', this.selectedContact.email as string);
  }

  contactName(contact?: DefaultRegisteredServiceContact): string | undefined {
    return contact ? contact.name : undefined;
  }

  claim() {
    this.spinner.start('Claiming service');
    this.service.claim(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.showSubmit('changeService', ''));
  }

  unclaim() {
    this.spinner.start('Disowning service');
    this.service.unclaim(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.showSubmit('changeService', ''));
  }

  owner(): boolean {
    if (this.selectedItem && this.selectedItem.contacts) {
      return this.selectedItem.contacts.indexOf(this.user.user.firstName + ' ' + this.user.user.familyName) > -1;
    }
    return false;
  }

  showSubmit(type: string, msg: string) {
    const dialogRef = this.dialog.open(SubmitComponent, {
      data: [type, msg],
      width: '500px',
      position: {top: '100px'}
    });
  }

  bulkUnclaim() {
    const srvcs = this.getSelections();
    this.spinner.start('Disowning services');
    this.service.bulkUnclaim(srvcs)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
        this.showSubmit('changeService', '');
        this.bulk = false;
      },
     error => this.showSubmit('bulkRemoveFailed', error.error.message)
    );
  }

  bulkClaim() {
    const srvcs = this.getSelections();
    this.spinner.start('Claiming services');
    this.service.bulkClaim(srvcs)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
        this.showSubmit('changeService', '');
        this.bulk = false;
      },
      error => this.showSubmit('bulkAddFailed', error.error.message));
  }

  bulkRemove() {
    const srvcs = this.getSelections();
    this.spinner.start('Disowning services');
    this.service.bulkRemove(srvcs, this.selectedContact)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
        this.showSubmit('changeService', '');
        this.bulk = false;
      },
        error => this.showSubmit('bulkRemoveFailed', error.error.message));
  }

  bulkAdd() {
    const dialogRef = this.dialog.open(AddContactComponent, {
        width: '500px',
        position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(c => {
      if (c) {
        const srvcs = this.getSelections();
        this.spinner.start('Adding contacts');
        this.service.bulkAdd(srvcs, c)
          .pipe(finalize(() => this.spinner.stop()))
          .subscribe(resp => {
              this.showSubmit('changeService', '');
              this.bulk = false;
            }, error => this.showSubmit('bulkAddFailed', error.error.message));
      }
    });
  }

  getSelections(): string[] {
    const srvcs = [];
    for (const item of this.dataSource.data) {
      if (item.selected) {
        srvcs.push(item.assignedId);
      }
    }
    return srvcs;
  }

  selectAll(all: boolean) {
    for (const item of this.dataSource.data) {
      item.selected = all;
    }
  }

  clear() {
    this.selectAll(false);
  }

}
