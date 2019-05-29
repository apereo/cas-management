import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {SsoSession, SsoSessionsResponse} from '../domain/sessions';
import {SsosessionsService} from './ssosessions-service';
import {debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {SsodetailComponent} from '../ssodetail/ssodetail.component';

@Component({
  selector: 'app-ssosessions',
  templateUrl: './ssosessions.component.html',
  styleUrls: ['./ssosessions.component.css']
})
export class SsosessionsComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'user', 'creation', 'uses'];
  dataSource: MatTableDataSource<SsoSession>;
  selectedItem: SsoSession;
  searched: string;

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

  private searchText = new Subject<string>();

  constructor(private service: SsosessionsService,
              private spinner: SpinnerService,
              private dialog: MatDialog) {

  }

  ngOnInit() {
   this.dataSource = new MatTableDataSource<SsoSession>([]);
   this.dataSource.paginator = this.paginator.paginator;
    this.searchText.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((user: string) => {
        if (user && user !== '') {
          this.spinner.start('Searching');
          this.searched = user;
          return this.service.getSessions(user)
            .pipe(finalize(() => this.spinner.stop()));
        } else {
          return new Observable((observer) => observer.next(null));
        }
      })
    ).subscribe((resp: SsoSessionsResponse)  => {
      if (resp !== null) {
        this.dataSource.data = resp.activeSsoSessions;
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

  view(session: SsoSession) {
    const dialogRef = this.dialog.open(SsodetailComponent, {
      data: session,
      width: '800px',
      position: {top: '100px'}
    });
  }

  delete() {
    this.service.revokeSession(this.selectedItem.ticketGrantingTicket, this.searched).subscribe(r => {
      const index = this.dataSource.data.indexOf(this.selectedItem);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

}
