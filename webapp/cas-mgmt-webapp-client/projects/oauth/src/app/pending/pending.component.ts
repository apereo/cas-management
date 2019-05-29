import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AppConfigService, PaginatorComponent, PendingItem, SpinnerService} from 'mgmt-lib';
import {finalize} from 'rxjs/operators';
import {RegisterService} from '../../../../register/src/app/core/register.servivce';
import {OAuthService} from '../core/oauth.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})

export class PendingComponent implements OnInit {
  dataSource: MatTableDataSource<PendingItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'submitted'];
  loading = false;
  selectedItem: PendingItem;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(private route: ActivatedRoute,
              public service: OAuthService,
              public appService: AppConfigService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public breakObserver: BreakpointObserver,
              public router: Router,
              public spinner: SpinnerService) {
  }

  ngOnInit() {

    this.route.data
      .subscribe((data: { resp: PendingItem[]}) => {
        if (data.resp) {
          this.dataSource = new MatTableDataSource(data.resp);
          this.dataSource.paginator = this.paginator.paginator;
        } else {
          this.snackBar.open('Unable to retrieve service listing.', 'dismiss', {
            duration: 5000
          });
        }
      });
    this.breakObserver.observe(['(max-width: 499px)'])
      .subscribe(r => {
        if (r.matches) {
          this. displayedColumns = ['actions', 'serviceId'];
        } else {
          this. displayedColumns = ['actions', 'name', 'serviceId', 'submitted'];
        }
      });
  }

  refresh() {
    this.getServices();
  }

  getServices() {
    this.spinner.start();
    this.service.getSubmissions()
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
        this.dataSource.data = resp;
      },
      error => {
        this.snackBar.open('Unable to retrieve service listing.', 'Dismiss', {
          duration: 5000
        });
      });
  }

  edit() {
    this.router.navigate(['form/edit', this.selectedItem.id]);
  }

  remove() {
    this.spinner.start('Cancelling submission');
    this.service.deletePending(this.selectedItem.id as string)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
        this.spinner.stop();
        this.refresh(); }
      );
  }

}
