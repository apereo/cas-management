import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceItem } from '@apereo/mgmt-lib/src/lib/model';
import {AppConfigService, PaginatorComponent, ControlsService, ImportService, RejectComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {SubmissionsService} from './submissions.service';
import {MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

/**
 * Component to list submissions made by users for changes to the registry.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})

export class SubmissionsComponent implements OnInit, OnDestroy {
  rejectItem: ServiceItem;
  domain: string;
  selectedItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = [];
  subscription: Subscription;

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public service: SubmissionsService,
              public importService: ImportService,
              public appService: AppConfigService,
              public controls: ControlsService,
              public dialog: MatDialog,
              public controlsService: ControlsService,
              public mediaObserver: MediaObserver) {
    this.controls.icon = 'list';
    this.controls.title = 'Submissions';
  }

  /**
   * Starts the component by extract list of submissions from resolver and displaying them in the table.
   */
  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
          if (!data.resp) {
            this.appService.showSnackBar('Unable to retrieve service listing.');
          }
          setTimeout(() => {
            this.dataSource.data = data.resp;
          }, 10);
        }
      );
    this.route.params.subscribe((params) => this.domain = params.domain);
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
    this.controls.resetButtons();
    this.controls.showRefresh = true;
    this.subscription = this.controls.refresh.subscribe(() => this.refresh());
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Sets the columns to be displayed based on the screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'name', 'serviceType'];
    } else {
      this.displayedColumns = ['actions', 'name', 'serviceId', 'serviceType', 'submitter', 'submitted'];
    }
  }

  /**
   * Loads the submission into the FormComponent to be inspected and accepted.
   */
  serviceEdit() {
    this.importService.importSubmission(this.selectedItem.assignedId)
      .subscribe(() => {this.router.navigate(['form/importService']).then(); });
  }

  /**
   * Opens the file viewer passing the service in yaml form.
   */
  getYaml() {
    this.service.getYaml(this.selectedItem.assignedId)
      .subscribe(resp => this.appService.openView(resp, 'yaml'));
  }

  /**
   * Opens the file viewer passing the service in json form.
   */
  getJson() {
    this.service.getJson(this.selectedItem.assignedId)
      .subscribe(resp => this.appService.openView(resp, 'hjson'));
  }

  /**
   * Opens the file viewer passing the metadata for the submission.
   */
  getMetadata() {
    this.service.getMetadata(this.selectedItem.assignedId)
      .subscribe(resp => this.appService.openView(resp, 'xml'));
  }

  /**
   * Opens the file viewer passing the calculated diff to be displayed.
   */
  diff() {
    this.service.diff(this.selectedItem.assignedId)
      .subscribe(resp => this.appService.openView(resp, 'diff'));
  }

  /**
   * Accepts the submission and moves the service into the registry.
   */
  accept() {
    this.service.accept(this.selectedItem.assignedId)
      .subscribe(() => {
        this.appService.showSnackBar('Submission has been accepted');
        this.refresh();
      });
  }

  /**
   * Deletes the submission file after acceptance.
   */
  delete() {
    this.service.deleteSubmission(this.selectedItem.assignedId)
      .subscribe(() => {
        this.appService.showSnackBar('Service has been deleted.');
        this.refresh();
      });
  }

  /**
   * Opens a modal dialog for admin to confirm and add a rejection note.
   */
  openRejectModal() {
    this.dialog.open(RejectComponent, {
      data: this.selectedItem,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.reject(result);
      }
    });
    this.rejectItem = this.selectedItem;
  }

  /**
   * Rejects the submission with the passed rejection note.
   *
   * @param note - rejection reason
   */
  reject(note: string) {
    this.service.reject(this.rejectItem.assignedId, note)
      .subscribe(() => {
        this.appService.showSnackBar('Submitted Service has been rejected');
        this.refresh();
      });
  }

  /**
   * Refreshes the submissions display.
   */
  refresh() {
    this.getServices();
    this.controlsService.gitStatus();
  }

  /**
   * Gets all submissions from the server.
   */
  getServices() {
    this.service.getSubmissions()
      .subscribe(resp => this.dataSource.data = resp,
        () => this.appService.showSnackBar('Unable to retrieve service listing.')
    );
  }

}
