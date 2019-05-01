import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {SsoSession, SsoSessionsResponse} from '../domain/sessions';
import {SsosessionsService} from './ssosessions-service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {UserService} from 'mgmt-lib';

@Component({
  selector: 'app-ssosessions',
  templateUrl: './ssosessions.component.html',
  styleUrls: ['./ssosessions.component.css']
})
export class SsosessionsComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'creation', 'uses'];
  dataSource: MatTableDataSource<SsoSession>;
  selectedItem: SsoSession;

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

  private searchText = new Subject<string>();

  constructor(private service: SsosessionsService,
              private user: UserService,
              private spinner: SpinnerService,
              private dialog: MatDialog,
              private route: ActivatedRoute) {

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
    this.service.revokeSession(this.selectedItem.ticketGrantingTicket, this.user.user.id).subscribe(r => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(this.selectedItem), 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

}
