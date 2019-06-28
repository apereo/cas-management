import {Component, OnInit, ViewChild} from '@angular/core';
import {OAuthToken} from '../domain/sessions';
import {TokensService} from './tokens-service';
import { MatTableDataSource } from '@angular/material/table';
import {PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'user', 'creation', 'uses'];
  dataSource: MatTableDataSource<OAuthToken>;
  selectedItem: OAuthToken;
  searched: string;

  private searchText = new Subject<string>();

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  constructor(private service: TokensService,
              private spinner: SpinnerService,
              private dialog: MatDialog) {

  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource<OAuthToken>([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.searchText.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((user: string) => {
        if (user && user !== '') {
          this.spinner.start('Searching');
          this.searched = user;
          return this.service.getTokens(user)
            .pipe(finalize(() => this.spinner.stop()));
        } else {
          return new Observable((observer) => observer.next(null));
        }
      })
    ).subscribe((resp: OAuthToken[])  => {
      if (resp !== null) {
        this.dataSource.data = resp;
        this.dataSource._updateChangeSubscription();
      } else {
        this.dataSource.data = [];
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  view(id: string) {

  }

  delete() {
    this.service.revokeToken(this.selectedItem.id).subscribe(r => {
      this.service.getTokens(this.searched).subscribe(v => {
        this.dataSource.data = v;
        this.dataSource._updateChangeSubscription();
      });
    });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

  doLookup(val: string) {
    this.searchText.next(val);
  }
}
