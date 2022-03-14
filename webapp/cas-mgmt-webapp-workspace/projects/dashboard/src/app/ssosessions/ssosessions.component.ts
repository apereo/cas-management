import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {ControlsService, PaginatorComponent} from '@apereo/mgmt-lib';
import {SsoSession, SsoSessionsResponse} from '../domain/sessions.model';
import {SsosessionsService} from './ssosessions-service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {DetailComponent} from './detail/detail.component';
import { MatSort } from '@angular/material/sort';

/**
 * Component to display/revoke user sso sessions in the CAS cluster.
 *
 * @author Travis Schmidt
 */
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

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private searchText = new Subject<string>();

  constructor(private service: SsosessionsService,
              private controls: ControlsService,
              private dialog: MatDialog) {
  }

  /**
   * Sets up lookup pipe for user id.
   */
  ngOnInit() {
    this.dataSource = new MatTableDataSource<SsoSession>([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.searchText.pipe(
       debounceTime(500),
       distinctUntilChanged(),
       switchMap(q => this.query(q))
     ).subscribe((resp: SsoSessionsResponse)  => {
       if (resp !== null) {
         this.dataSource.data = resp.activeSsoSessions;
         this.dataSource._updateChangeSubscription();
       } else {
         this.dataSource.data = [];
         this.dataSource._updateChangeSubscription();
       }
    });
    this.controls.resetButtons();
    this.controls.title = 'SSO Sessions';
    this.controls.icon = 'local_activity';

    this.doLookup('');
  }

  /**
   * Calls the server to for user sessions with the passed in userid.
   *
   * @param user - user to look up
   */
  query(user: string) {
    return this.service.getSessions(user);
  }

  /**
   * Gets text from view and passed it to subject.
   *
   * @param val - text to look up
   */
  doLookup(val: string) {
    this.searchText.next(val);
  }

  /**
   * Opens the detail dialog for a user session.
   *
   * @param session - user sso session
   */
  view(session: SsoSession) {
    this.dialog.open(DetailComponent, {
      data: session,
      width: '800px',
      position: {top: '100px'}
    });
  }

  /**
   * Revokes the selected user session from the CAS cluster.
   */
  delete() {
    this.service.revokeSession(this.selectedItem.ticketGrantingTicket, this.searched).subscribe(() => {
      const index = this.dataSource.data.indexOf(this.selectedItem);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  /**
   * Filters the table by the passed text.
   *
   * @param val - text to filter by.
   */
  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

}
