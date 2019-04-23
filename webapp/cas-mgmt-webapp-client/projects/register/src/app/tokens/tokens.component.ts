import {Component, OnInit, ViewChild} from '@angular/core';
import {OAuthToken} from '../domain/sessions';
import {TokensService} from './tokens-service';
import {MatTableDataSource} from '@angular/material';
import {PaginatorComponent} from 'mgmt-lib';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'creation', 'uses'];
  dataSource: MatTableDataSource<OAuthToken>;
  selectedItem: OAuthToken;

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

  constructor(private service: TokensService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: OAuthToken[]}) => {
      this.dataSource = new MatTableDataSource<OAuthToken>(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

  delete() {
    this.service.revokeToken(this.selectedItem.id).subscribe(r => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(this.selectedItem), 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

}
