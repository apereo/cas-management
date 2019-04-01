import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {SsoSession, SsoSessionsResponse} from '../domain/sessions';
import {SsosessionsService} from './ssosessions-service';
import {debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-ssosessions',
  templateUrl: './ssosessions.component.html',
  styleUrls: ['./ssosessions.component.css']
})
export class SsosessionsComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'user', 'creation', 'uses'];
  dataSource: MatTableDataSource<SsoSession>;
  selectedItem: SsoSession;

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

  private searchText = new Subject<string>();

  constructor(private service: SsosessionsService, private spinner: SpinnerService) {

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

  view(id: string) {

  }

  delete() {
    this.service.revokeSession(this.selectedItem.ticketGrantingTicket).subscribe(r => {
      this.dataSource.data = this.dataSource.data.splice(1,
        this.dataSource.data.findIndex(value => value.ticketGrantingTicket === this.selectedItem.ticketGrantingTicket));
      this.dataSource._updateChangeSubscription();
    });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

}
