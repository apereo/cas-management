import {Component, OnInit, ViewChild} from '@angular/core';
import {OAuthToken} from '../domain/sessions';
import { MatTableDataSource } from '@angular/material/table';
import {PaginatorComponent} from 'shared-lib';
import {DashboardService} from '../core/dashboard-service';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'user', 'creation', 'uses'];
  dataSource: MatTableDataSource<OAuthToken>;
  selectedItem: OAuthToken;

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  constructor(private service: DashboardService) {
  }

  ngOnInit() {
    this.service.getTokens().subscribe(r => {
      this.dataSource = new MatTableDataSource<OAuthToken>(r);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

  view(id: string) {

  }

  delete() {
    this.service.revokeToken(this.selectedItem.id).subscribe(r => {
      this.service.getTokens().subscribe(v => {
        this.dataSource.data = v;
        this.dataSource._updateChangeSubscription();
      });
    });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

}
