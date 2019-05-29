import {Component, OnInit, ViewChild} from '@angular/core';
import {OAuthToken} from '../domain/sessions';
import {TokensService} from './tokens-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {ActivatedRoute} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  displayedColumns = ['actions', 'id', 'creation', 'uses'];
  dataSource: MatTableDataSource<OAuthToken>;
  selectedItem: OAuthToken;
  bulk = false;

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;

  constructor(private service: TokensService,
              private spinner: SpinnerService,
              private snackBar: MatSnackBar,
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
        sess.push(item.id);
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
    this.service.getUserTokens().subscribe(sess => {
      this.dataSource.data = sess;
      this.dataSource._updateChangeSubscription();
    });
  }

}
