import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {SsoSession, SsoSessionResponse} from '../domain/sessions';
import {PaginatorComponent} from 'shared-lib';
import {SsoSessionService} from './ssosessions-service';
import {ActivatedRoute} from '@angular/router';
import {DetailComponent} from './detail/detail.component';

@Component({
  selector: 'app-ssosession',
  templateUrl: './ssosession.component.html',
  styleUrls: ['./ssosession.component.css']
})
export class SsosessionComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'user', 'creation', 'uses'];
  dataSource: MatTableDataSource<SsoSession>;
  selectedItem: SsoSession;

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  constructor(private service: SsoSessionService,
              private dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: SsoSessionResponse}) => {
      this.dataSource = new MatTableDataSource<SsoSession>(data.resp.activeSsoSessions);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

  view(session?: SsoSession) {
    const dialogRef = this.dialog.open(DetailComponent, {
      data: session ? session : this.selectedItem,
      width: '800px',
      position: {top: '100px'}
    });
  }

  delete() {
    this.service.revokeSession(this.selectedItem.ticketGrantingTicket).subscribe(r => {
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
