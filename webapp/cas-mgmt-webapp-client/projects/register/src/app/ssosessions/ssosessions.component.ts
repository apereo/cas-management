import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {SsoSession, SsoSessionsResponse} from '../domain/sessions';
import {SsosessionsService} from './ssosessions-service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {UserService} from 'mgmt-lib';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-ssosessions',
  templateUrl: './ssosessions.component.html',
  styleUrls: ['./ssosessions.component.css']
})
export class SsosessionsComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'creation', 'uses'];
  dataSource: MatTableDataSource<SsoSession>;
  selectedItem: SsoSession;
  bulk = false;

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

  private searchText = new Subject<string>();

  constructor(private service: SsosessionsService,
              private user: UserService,
              private spinner: SpinnerService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {
   this.dataSource = new MatTableDataSource<SsoSession>([]);
   this.dataSource.paginator = this.paginator.paginator;
   this.route.data.subscribe((data: {resp: SsoSessionsResponse})  => {
      if (data.resp !== null) {
        this.dataSource.data = data.resp.activeSsoSessions;
        this.dataSource._updateChangeSubscription();
      } else {
        this.dataSource.data = [];
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  doLookup(val: string) {
    this.searchText.next(val);
  }

  delete() {
    this.service.revokeSession(this.selectedItem.ticketGrantingTicket, '-1').subscribe(r => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(this.selectedItem), 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

  bulkRevoke() {
    const sess = this.getSelections();
    this.spinner.start('Revoking sessions');
    this.service.bulkRevoke(sess)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
          this.bulk = false;
          this.refresh();
          this.snackBar.open(
            sess.length + ' Sessions Revoked',
            'Dismiss',
            { duration: 5000 }
          );
        },
        error => this.snackBar.open(
          'Bulk Revoke Failed',
          'Dismiss',
          { duration: 5000 })
      );
  }

  revokeAll() {
    this.spinner.start('Revoking all sessions');
    this.service.revokeAll()
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => {
          this.bulk = false;
          this.dataSource.data = [];
          this.dataSource._updateChangeSubscription();
          this.snackBar.open(
            'All Sessions Revoked',
            'Dismiss',
            { duration: 5000 }
          );
        },
        error => this.snackBar.open(
          'Revoke Failed',
          'Dismiss',
          { duration: 5000 })
      );
  }

  getSelections(): string[] {
    const sess = [];
    for (const item of this.dataSource.data) {
      if (item.selected) {
        sess.push(item.ticketGrantingTicket);
      }
    }
    return sess;
  }

  selectAll(all: boolean) {
    for (const item of this.dataSource.data) {
      item.selected = all;
    }
  }

  clear() {
    this.selectAll(false);
  }

  refresh() {
    this.service.getUserSessions().subscribe(sess => {
      this.dataSource.data = sess.activeSsoSessions;
      this.dataSource._updateChangeSubscription();
    });
  }
}
