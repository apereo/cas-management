import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  DefaultRegisteredServiceContact,
  ServiceItem,
  AppConfigService,
  PaginatorComponent
} from '@apereo/mgmt-lib';
import {RegisterService} from '../core/register.servivce';
import {DeleteComponent} from '../project-share/delete/delete.component';
import {SubmitComponent} from '../project-share/submit/submit.component';
import {AddContactComponent} from '../project-share/add-contact/add-contact.component';
import {MediaObserver} from '@angular/flex-layout';
import {ControlsService} from '../project-share/controls/controls.service';
import {Subscription} from 'rxjs';

/**
 * Component to display services the user is a contact on.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-register-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
  selectedItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = [];
  loading = false;
  subscriptions: Subscription[] = [];

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: RegisterService,
              public controls: ControlsService,
              public dialog: MatDialog,
              public app: AppConfigService,
              public mediaObserver: MediaObserver) {
    this.controls.title = 'Your Services';
    this.controls.icon = 'list';
    this.controls.showBulk = true;
    this.controls.showBack = false;
  }

  /**
   * Extracts the service list form the router and loads the table.
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
          this.dataSource = new MatTableDataSource(data.resp);
          this.dataSource.paginator = this.paginator.paginator;
          this.dataSource.sort = this.sort;
      });
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
    this.controls.resetButtons();
    this.subscriptions.push(this.controls.bulkAdd.subscribe(() => this.bulkAdd()));
    this.subscriptions.push(this.controls.bulkRemove.subscribe(() => this.bulkUnclaim()));
    this.subscriptions.push(this.controls.refresh.subscribe(() => this.refresh()));
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Sets the columns to display based on screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'name', 'serviceId', 'serviceType'];
    } else {
      this.displayedColumns = ['actions', 'name', 'serviceId', 'serviceType', 'staged'];
    }
  }

  /**
   * Navigates the app to the form component by the passed item or the selected item.
   *
   * @param item - ServiceItem
   */
  edit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['form/edit', this.selectedItem.assignedId]).then();
  }

  /**
   * Navigates to form component for the selected item to duplicate as a new service.
   */
  serviceDuplicate() {
    this.router.navigate(['form/duplicate', this.selectedItem.assignedId]).then();
  }

  /**
   * Opens the delete dialog to confirm removing a service.
   */
  removeModal() {
    this.dialog.open(DeleteComponent, {
      data: this.selectedItem,
      width: '500px',
      position: {top: '100px'}
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.remove(this.selectedItem.assignedId);
      }
    });
  }

  /**
   * Removes a the passed service from the registry.
   *
   * @param id - assigned id
   */
  private remove(id: string) {
    this.service.remove(this.selectedItem.assignedId)
      .subscribe(
        () => this.app.showSnackBar('Service Submitted for Removal'),
        () => this.app.showSnackBar('Request to remove service has failed')
      );
  }

  /**
   * Calls the server to get a list of services that the user is a contact for.
   */
  getServices() {
    this.service.getServices()
      .subscribe(
        resp => this.dataSource.data = resp,
        () => this.app.showSnackBar('Unable to retrieve service listing.')
      );
  }

  /**
   * Refreshes data.
   */
  refresh() {
    this.getServices();
  }

  /**
   * Unclaims a service by the logged in user.
   */
  unclaim() {
    this.service.unclaim(this.selectedItem.assignedId)
      .subscribe(
        () => this.showSubmit('changeService', ''),
        error => this.showSubmit('bulkRemoveFailed', error.error.message)
      );
  }

  /**
   * Shows submit instructions in dialog.
   *
   * @param type - type of submit
   * @param msg - message to display
   */
  showSubmit(type: string, msg: string) {
    this.dialog.open(SubmitComponent, {
      data: [type, msg],
      width: '500px',
      position: {top: '100px'}
    });
  }

  /**
   * Removes the logged in user from all the selected services.
   */
  bulkUnclaim() {
    this.service.bulkUnclaim(this.getSelections())
      .subscribe(
        () => {
          this.showSubmit('changeService', '');
          this.controls.bulk = false;
        },
        error => this.showSubmit('bulkRemoveFailed', error.error.message));
  }

  /**
   * Opens the Add Contact dialog to select users to add to services.
   */
  bulkAdd() {
    this.dialog.open(AddContactComponent, {
      width: '500px',
      position: {top: '100px'}
    }).afterClosed().subscribe(c => {
      if (c) {
        this.addContacts(c);
      }
    });
  }

  /**
   * Adds the list of contacts to all teh selected services.
   *
   * @param c - list of contacts.
   */
  addContacts(c: DefaultRegisteredServiceContact[]) {
    this.service.bulkAdd(this.getSelections(), c)
      .subscribe(
        () => {
          this.showSubmit('changeService', '');
          this.controls.bulk = false;
        },
        error => this.showSubmit('bulkAddFailed', error.error.message));
  }

  /**
   * Returns a list of assigned ids for all selected services.
   */
  getSelections(): string[] {
    return this.dataSource.data
      .filter(i => i.selected)
      .map(i => i.assignedId);
  }

  /**
   * Selects/deselects all services in the list based on the flag passed.
   *
   * @param all - true for select
   */
  selectAll(all: boolean) {
    for (const item of this.dataSource.data) {
      item.selected = all;
    }
  }

  /**
   * Clears all selections in the list.
   */
  clear() {
    this.selectAll(false);
  }

  /**
   * Returns true if the service is stage only.
   */
  staged(): boolean {
    return this.selectedItem && this.selectedItem.staged;
  }

  /**
   * Promotes the selected item to production.
   */
  promote() {
    this.service.promote(+this.selectedItem.assignedId)
      .subscribe(
        () => this.showSubmit('promoteService', ''),
        error => this.showSubmit('promoteFailed', error.error.message)
      );
  }

  /**
   * Calls server to get metadata for a saml service.
   */
  getMetadata() {
    this.service.getMetadata(this.selectedItem.assignedId)
      .subscribe(resp => this.app.openView(resp.metadata, 'xml'));
  }

}
