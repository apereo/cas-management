import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {DeleteComponent} from '../project-share/delete/delete.component';
import {SubmitComponent} from '../project-share/submit/submit.component';
import {AddContactComponent} from '../project-share/add-contact/add-contact.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {PaginatorComponent, ServiceItem, SpinnerService} from 'mgmt-lib';
import {RegisterService} from '../core/register.servivce';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-register-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  selectedItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'duo', 'sso', 'expires'];
  loading = false;
  bulk = false;
  allSelected = false;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: RegisterService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public breakObserver: BreakpointObserver,
              public spinner: SpinnerService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
          this.dataSource = new MatTableDataSource(data.resp);
          this.dataSource.paginator = this.paginator.paginator;
          this.dataSource.sort = this.sort;
      });
    this.breakObserver.observe(['(max-width: 499px)'])
      .subscribe(r => {
        if (r.matches) {
          this.displayedColumns = ['actions', 'name', 'serviceId'];
        } else {
          this.displayedColumns = ['actions', 'name', 'serviceId', 'duo', 'sso'];
        }
    });
  }

  edit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['form/edit', this.selectedItem.assignedId]);
  }

  remove() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: this.selectedItem,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.spinner.start('Submitting delete');
        this.service.remove(this.selectedItem.assignedId)
          .pipe(finalize(() => this.spinner.stop()))
          .subscribe(() => this.snackBar
              .open('Service Submitted for Removal',
                'Dismiss',
                {duration: 5000}
              ),
            () => this.snackBar
              .open('Request to remove service has failed',
                'Dismiss',
                {duration: 5000}
              )
          );
        }
      }
    );
  }

  getServices() {
    this.spinner.start('Refreshing services');
    this.service.getServices()
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.dataSource.data = resp,
                 error => this.snackBar.open('Unable to retrieve service listing.', 'Dismiss', {
        duration: 5000
      }));
  }

  refresh() {
    this.spinner.start('Refreshing services');
    this.service.getServices()
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
          this.dataSource.data = resp;
        },
        () => {
          this.snackBar
            .open('Unable to retrieve service listing.',
              'Dismiss',
              {duration: 5000}
            );
         });
  }

  unclaim() {
    this.spinner.start('Disowning service');
    this.service.unclaim(this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.showSubmit('changeService', ''),
        error => this.showSubmit('bulkRemoveFailed', error.error.message)
      );
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
