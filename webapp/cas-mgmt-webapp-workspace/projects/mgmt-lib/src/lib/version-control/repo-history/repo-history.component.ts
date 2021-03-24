import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfigService, ControlsService, PaginatorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {Commit} from '@apereo/mgmt-lib/src/lib/model';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {MediaObserver} from '@angular/flex-layout';
import {HistoryService} from '../history/history.service';
import {Subscription} from 'rxjs';

/**
 * Component to display all commits made to the repository.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-repo-history',
  templateUrl: './repo-history.component.html',
  styleUrls: ['./repo-history.component.css']
})
export class RepoHistoryComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Commit>;
  displayedColumns = ['actions', 'id', 'message', 'time'];
  selectedItem: Commit;
  subscription: Subscription;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  constructor(private service: HistoryService,
              private router: Router,
              private route: ActivatedRoute,
              private app: AppConfigService,
              private controls: ControlsService,
              public mediaObserver: MediaObserver) {
    this.controls.title = 'History';
    this.controls.icon = 'history';
  }

  /**
   * Extracts commits from the resolver and loads the table.
   */
  ngOnInit() {
    this.route.data.subscribe((data: { resp: Commit[] }) => {
      this.dataSource = new MatTableDataSource<Commit>(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(c => this.setColumns());
    this.controls.resetButtons();
    this.controls.showRefresh = true;
    this.subscription = this.controls.refresh.subscribe(() => this.refresh());
  }

  /**
   * Destroy subscription.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Sets the columns to display based om screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'message'];
    } else {
      this.displayedColumns = ['actions', 'id', 'message', 'time'];
    }
  }

  /**
   * Refreshes the commits.
   */
  refresh() {
    this.service.commitLogs()
      .subscribe(resp => this.dataSource.data = resp);
  }

  /**
   * Navigates to the CommitHistory component for the passed commit or the selected item.
   *
   * @param commit - commit
   */
  viewChanges(commit?: Commit) {
    if (commit) {
      this.selectedItem = commit;
    }
    this.router.navigate(['version-control/commit-history', this.selectedItem.id]).then();
  }

  /**
   * Checkout the commit to the working changes.
   */
  checkout() {
    this.service.checkoutCommit(this.selectedItem.id)
      .subscribe(() =>
        this.app.showSnackBar('Commit has been checked out')
      );
  }
}
