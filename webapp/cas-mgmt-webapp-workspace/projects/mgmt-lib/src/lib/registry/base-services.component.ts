import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfigService, ControlsService, PaginatorComponent, RevertComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MediaObserver} from '@angular/flex-layout';
import {DeleteComponent} from './delete/delete.component';
import {RegistryService} from './registry.service';
import {Subscription} from 'rxjs';

/**
 * Component to display a list of services in a registry.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-base-services',
  template: ''
})
export abstract class BaseServicesComponent implements OnInit, OnDestroy {
  deleteItem: ServiceItem;
  selectedItem: ServiceItem;
  revertItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = [];
  subscriptions: Subscription[] = [];

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  constructor(protected service: RegistryService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected appService: AppConfigService,
              protected controls: ControlsService,
              protected dialog: MatDialog,
              protected mediaObserver: MediaObserver) {
  }

  /**
   * Extracts list of services from the resolver and loads them into the table.
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      }
    );
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
    this.controls.resetButtons();
    this.controls.showNew = true;
    this.controls.showRefresh = true;
    this.subscriptions.push(this.controls.refresh.subscribe(() => this.refresh()));
    this.subscriptions.push(this.controls.newService.subscribe(() => this.createService()));
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Sets the columns to be displayed based on the screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'serviceId'];
    } else {
      this.displayedColumns = ['actions', 'name', 'serviceId', 'description'];
    }
  }

  /**
   * Navigates to FormComponent to edit the passed or selected service.
   *
   * @param item - service item
   */
  serviceEdit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['form/edit', this.selectedItem.assignedId]).then();
  }

  /**
   * Navigates the selected item to the YamlComponent.
   */
  getYaml() {
    this.router.navigate(['registry/yaml', this.selectedItem.assignedId]).then();
  }

  /**
   * Navigates the selected item to the JsonComponent.
   */
  getJson() {
    this.router.navigate(['registry/json', this.selectedItem.assignedId]).then();
  }

  /**
   * Navigates the selected item to the FormComponent to be duplicated as new service..
   */
  serviceDuplicate() {
    this.router.navigate(['form/duplicate', this.selectedItem.assignedId]).then();
  }

  /**
   * Opens dialog component to confirm delete a service.
   */
  openModalDelete() {
    this.dialog.open(DeleteComponent, {data: this.selectedItem})
      .afterClosed().subscribe(result => {
        if (result) {
          this.delete();
        }
      });
    this.deleteItem = this.selectedItem;
  }

  /**
   * Opens the dialog component to confirm reverting uncommitted changes to a service.
   */
  openModalRevert() {
    this.dialog.open(RevertComponent, {data: this.selectedItem})
      .afterClosed().subscribe(result => {
        if (result) {
          this.revert();
        }
      });
    this.revertItem = this.selectedItem;
  }

  /**
   * Calls the server to delete the selected service from the registry.
   */
  delete() {
    this.service.deleteService(+this.deleteItem.assignedId)
      .subscribe(() => this.handleDelete(this.deleteItem.name),
       (e: any) => this.appService.showSnackBar(e.message || e.text())
      );
  }

  /**
   * Handles the return from succesfully deleting a service from the registry.
   *
   * @param name - name of service
   */
  handleDelete(name: string) {
    this.appService.showSnackBar(name + ' has been successfully deleted.');
    this.refresh();
  }

  /**
   * Navigates to the HistoryComponent for the selected service.
   */
  history() {
    const fileName: string = ('service-' + this.selectedItem.assignedId + '.json').replace(/ /g, '');
    this.router.navigate(['version-control/history', fileName]).then();
  }

  /**
   * Calls the server to revert uncommitted changes to the service.
   */
  revert() {
    const fileName: string = (this.revertItem.name + '-' + this.revertItem.assignedId + '.json').replace(/ /g, '');
    this.service.revert(fileName)
      .subscribe(this.handleRevert);
  }

  /**
   * Handles the return from a successful call to the server to revert changes for a service.
   */
  handleRevert() {
    this.refresh();
    this.appService.showSnackBar('Change has been reverted');
  }

  /**
   * Refreshes the services.
   */
  refresh() {
    this.getServices();
  }

  /**
   * Method must be implemented by extending component.
   */
  abstract getServices();

  /**
   * Create new Service.
   */
  abstract createService();

  /**
   * Returns true if show history menu options is enabled.
   */
  showHistory(): boolean {
    return this.appService.config.versionControl &&
           this.selectedItem &&
           this.selectedItem.status !== 'ADD';
  }

  /**
   * Returns true if the show revert menu option is enabled.
   */
  showRevert(): boolean {
    return this.appService.config.versionControl &&
           this.selectedItem &&
           this.selectedItem.status === 'MODIFY';
  }

  /**
   * Returns true if the service has 'ADDED' status in the repository.
   *
   * @param row - service item
   */
  added(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'ADDED';
  }

  /**
   * Returns true if the service has 'MODIFY' status in the repository.
   *
   * @param row - service item
   */
  modified(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'MODIFY';
  }

  /**
   * Returns true if the service has 'DELETED' status in the repository.
   *
   * @param row - service item
   */
  deleted(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'DELETE';
  }

  /**
   * Returns the git status of the service in the repository if version control is enabled.
   *
   * @param row - service item
   */
  status(row: ServiceItem): string {
    return this.appService.config.versionControl ? row.status : '';
  }

  /**
   * Returns true if the service is only available to staged environments.
   */
  staged(): boolean {
    return this.selectedItem && this.selectedItem.staged;
  }

  /**
   * Calls the server to promote a staged service to be available in production environments.
   */
  promote() {
    this.service.promote(+this.selectedItem.assignedId).subscribe(() => {
      this.refresh();
    });
  }

  /**
   * Calls the server to demote a service to be in staged environments only.
   */
  demote() {
    this.service.demote(+this.selectedItem.assignedId).subscribe(() => {
      this.refresh();
    });
  }

}
