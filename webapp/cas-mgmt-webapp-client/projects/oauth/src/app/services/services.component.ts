import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {DeleteComponent} from '../project-share/delete/delete.component';
import {SubmitComponent} from '../project-share/submit/submit.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {PaginatorComponent, ServiceItem, SpinnerService} from 'mgmt-lib';
import {finalize} from 'rxjs/operators';
import {OAuthService} from '../core/oauth.service';

@Component({
  selector: 'app-register-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  selectedItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'staged'];
  loading = false;

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: OAuthService,
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
  }

  edit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    if (this.selectedItem.cname.indexOf('oauth') > -1) {
      this.router.navigate(['form/oauth', this.selectedItem.assignedId]);
    } else {
      this.router.navigate(['form/oidc', this.selectedItem.assignedId]);
    }
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

  showSubmit(type: string, msg: string) {
    const dialogRef = this.dialog.open(SubmitComponent, {
      data: [type, msg],
      width: '500px',
      position: {top: '100px'}
    });
  }

  staged(): boolean {
    return this.selectedItem && this.selectedItem.staged;
  }

  promote() {
    this.service.promote(+this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(() => this.snackBar
          .open('Service Submitted for promotion',
            'Dismiss',
            {duration: 5000}
          ),
        () => this.snackBar
          .open('Request to promote service has failed',
            'Dismiss',
            {duration: 5000}
          )
      );
  }

}
