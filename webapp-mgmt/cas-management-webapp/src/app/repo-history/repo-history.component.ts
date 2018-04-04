import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {RepoHistoryService} from './repo-history.service';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Commit} from '../../domain/commit';
import {Router} from '@angular/router';
import {PaginatorComponent} from '../paginator/paginator.component';

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

  constructor(public messages: Messages,
              private service: RepoHistoryService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Commit>([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.service.commitLogs().then(resp => this.dataSource.data = resp);
  }

  viewChanges(commit?: Commit) {
    if (commit) {
      this.selectedItem = commit;
    }

    this.router.navigate(['/commit-history', this.selectedItem.id]);
  }

  checkout() {
    this.service.checkout(this.selectedItem.id).then(resp => {
      this.snackBar.open('Commit has been checked out', 'Dismiss', {
        duration: 5000
      });
    })
  }
}
