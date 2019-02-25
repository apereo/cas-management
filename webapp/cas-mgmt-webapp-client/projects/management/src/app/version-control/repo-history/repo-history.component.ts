import {Component, OnInit, ViewChild} from '@angular/core';
import {Commit, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {RepoHistoryService} from './repo-history.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-repo-history',
  templateUrl: './repo-history.component.html',
  styleUrls: ['./repo-history.component.css']
})
export class RepoHistoryComponent implements OnInit {

  dataSource: MatTableDataSource<Commit>;
  displayedColumns = ['actions', 'id', 'message', 'time'];
  selectedItem: Commit;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(private service: RepoHistoryService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              public breakObserver: BreakpointObserver,
              public spinner: SpinnerService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Commit[]}) => {
      this.dataSource = new MatTableDataSource<Commit>(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
    this.breakObserver.observe(['(max-width: 499px)'])
      .subscribe(r => {
        if (r.matches) {
          this.displayedColumns = ['actions', 'message'];
        } else {
          this.displayedColumns = ['actions', 'id', 'message', 'time'];
        }
      });
  }

  refresh() {
    this.spinner.start('Refreshing');
    this.service.commitLogs()
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.dataSource.data = resp);
  }

  viewChanges(commit?: Commit) {
    if (commit) {
      this.selectedItem = commit;
    }
    this.router.navigate(['version-control/commit-history', this.selectedItem.id]);
  }

  checkout() {
    this.spinner.start('Checking out commit');
    this.service.checkout(this.selectedItem.id)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(() =>
        this.snackBar
          .open('Commit has been checked out',
            'Dismiss',
            {duration: 5000}
          )
      );
  }
}
