import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {AppConfigService, PaginatorComponent, ServiceItem, SpinnerService} from 'mgmt-lib';
import {ControlsService} from '../project-share/controls/controls.service';
import {SubmissionsService} from './submissions.service';
import {ImportService} from '../registry/import/import.service';
import {RejectComponent} from '../admin/reject/reject.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {ViewComponent} from '../project-share/view/view.component';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})

export class SubmissionsComponent implements OnInit {
  rejectItem: ServiceItem;
  domain: string;
  selectedItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'submitter', 'submitted'];

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  @ViewChild(MatSort) sort: MatSort;

  isHandSet$: Observable<boolean> = this.breakPointObserver.observe(['(max-width: 499px)'])
    .pipe(
      map(result => result.matches)
    );

  constructor(private route: ActivatedRoute,
              private router: Router,
              public service: SubmissionsService,
              public importService: ImportService,
              public appService: AppConfigService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public controlsService: ControlsService,
              public breakPointObserver: BreakpointObserver,
              public spinner: SpinnerService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
          if (!data.resp) {
            this.snackBar.open('Unable to retrieve service listing.', 'dismiss', {
              duration: 5000
            });
          }
          setTimeout(() => {
            this.dataSource.data = data.resp;
          }, 10);
        }
      );
    this.route.params.subscribe((params) => this.domain = params['domain']);
    this.isHandSet$.subscribe(r => {
      if (r) {
        this.displayedColumns = ['actions', 'name'];
      } else {
        this.displayedColumns = ['actions', 'name', 'serviceId', 'submitter', 'submitted'];
      }
    })
  }

  serviceEdit() {
    this.spinner.start('Loading submission');
    this.importService.importSubmission(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
        this.router.navigate(['form/importService']);
      });
  }

  getYaml() {
    this.spinner.start('Loading yaml');
    this.service.getYaml(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.openView(resp, 'yaml'));
  }

  getJson() {
    this.spinner.start('Loading json');
    this.service.getJson(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.openView(resp, 'hjson'));
  }

  diff() {
    this.spinner.start('Loading diff');
    this.service.diff(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.openView(resp, 'diff'));
  }

  openView(value: string, mode: string) {
    this.dialog.open(ViewComponent, {
      data: [value, mode],
      width: '900px',
      position: { top: '50px'}
    })
  }

  accept() {
    this.spinner.start('Accepting submission');
    this.service.accept(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
        this.snackBar
          .open('Submission has been accepted',
            'Dismiss',
            {duration: 5000}
          );
        this.refresh();
      });
  }

  delete() {
    this.spinner.start('Deleting service');
    this.service.deleteSubmission(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(() => {
        this.snackBar
          .open('Service has been deleted.',
            'Dismiss',
            {duration: 5000}
          );
        this.refresh();
      });
  }

  openRejectModal() {
    const dialogRef = this.dialog.open(RejectComponent, {
      data: this.selectedItem,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reject(result);
      }
    });
    this.rejectItem = this.selectedItem;
  }

  reject(note: string) {
    this.spinner.start('Rejecting submission');
    this.service.reject(this.rejectItem.assignedId, note)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
        this.snackBar.open('Submitted Service has been rejected', 'Dismiss', {
          duration: 5000
        });
        this.refresh();
      });
  }

  refresh() {
    this.getServices();
    this.controlsService.gitStatus();
  }

  getServices() {
    this.spinner.start('Refreshing');
    this.service.getSubmissions()
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.dataSource.data = resp,
      error =>
        this.snackBar.open(
          'Unable to retrieve service listing.',
          'Dismiss',
          { duration: 5000 }
        )
      );
  }

}
