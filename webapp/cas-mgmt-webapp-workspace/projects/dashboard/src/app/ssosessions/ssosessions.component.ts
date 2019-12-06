import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {PaginatorComponent} from 'shared-lib';
import {SsoSession, SsoSessionsResponse} from '../domain/sessions';
import {SsosessionsService} from './ssosessions-service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {DetailComponent} from './detail/detail.component';
import {MatSort} from '@angular/material';

@Component({
  selector: 'app-ssosessions',
  templateUrl: './ssosessions.component.html',
  styleUrls: ['./ssosessions.component.css']
})
export class SsosessionsComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'user', 'creation', 'uses'];
  dataSource: MatTableDataSource<SsoSession>;
  selectedItem: SsoSession;

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: SsosessionsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<SsoSession>([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.refresh();
  }

  refresh() {
    this.service.getSessions().subscribe(resp => {
      if (resp !== null) {
        this.dataSource.data = resp.activeSsoSessions;
        this.dataSource._updateChangeSubscription();
      } else {
        this.dataSource.data = [];
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  view(session: SsoSession) {
    this.dialog.open(DetailComponent, {
      data: session,
      width: '800px',
      position: {top: '100px'}
    });
  }

  delete() {
    this.service.revokeSession(this.selectedItem.ticketGrantingTicket).subscribe(() => {
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
