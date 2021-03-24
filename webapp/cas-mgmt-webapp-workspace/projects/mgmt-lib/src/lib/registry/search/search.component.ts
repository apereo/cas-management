import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AppConfigService, ControlsService, PaginatorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {ServiceItem} from '@apereo/mgmt-lib/src/lib/model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SearchService} from './search.service';
import {MediaObserver} from '@angular/flex-layout';
import {BaseServicesComponent} from '../base-services.component';
import {RegistryService} from '../registry.service';
import {MatDialog} from '@angular/material/dialog';

/**
 * Component to display results from doing full text search of the services in the registry.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseServicesComponent implements OnInit {
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'serviceType', 'description'];

  selectedItem: ServiceItem;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public router: Router,
              public route: ActivatedRoute,
              public location: Location,
              public service: RegistryService,
              public searchService: SearchService,
              public dialog: MatDialog,
              public app: AppConfigService,
              public controls: ControlsService,
              public mediaObserver: MediaObserver,
              protected viewRef: ViewContainerRef) {
    super(service, route, router, app, controls, dialog, mediaObserver);
    this.controls.title = 'Search';
    this.controls.icon = 'search';
  }

  /**
   * Starts the service by displaying any current search results that may be stored in the service.
   */
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.searchService.results || []);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator.paginator;
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
    this.controls.resetButtons();
  }

  /**
   * Sets the columns for the table based on the screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'name', 'serviceId'];
    } else {
      this.displayedColumns = ['actions', 'name', 'serviceId', 'serviceType', 'description'];
    }
  }

  /**
   * Navigates either the passed item or the selected item to the FormComponent for edit.
   *
   * @param item - ServiceItem
   */
  serviceEdit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['form/edit', this.selectedItem.assignedId]).then();
  }

  /**
   * Opens the file viewer and loads the service as json.
   */
  viewJson() {
    this.service.getJson(+this.selectedItem.assignedId)
      .subscribe(f => this.app.openView(f, 'hjson', 'eclipse'));
  }

  /**
   * Opens the file viewer nad loads the service as yaml.
   */
  viewYaml() {
    this.service.getYaml(+this.selectedItem.assignedId)
      .subscribe(f => this.app.openView(f, 'yaml', 'eclipse'));
  }

  /**
   * Executes a Lucene search on the server scanning the full text of services for matches.
   *
   * @param query - Lucene query string
   */
  doSearch(query: string) {
    this.searchService.search(query)
      .subscribe(resp => this.dataSource.data = resp);
  }

  /**
   * stub.
   */
  getServices() {
  }

  /**
   * stub.
   */
  createService() {
  }
}

