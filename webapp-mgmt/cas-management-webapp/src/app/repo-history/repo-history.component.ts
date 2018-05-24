import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {RepoHistoryService} from './repo-history.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Commit} from '../../domain/commit';
import {ActivatedRoute, Router} from '@angular/router';
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
  looking = false;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(public messages: Messages,
              private service: RepoHistoryService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Commit[]}) => {
      this.dataSource = new MatTableDataSource<Commit>(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

  refresh() {
    this.looking = true;
    this.service.commitLogs().subscribe(resp => {
      this.looking = false
      this.dataSource.data = resp
    },
      error => this.looking = false);
  }

  viewChanges(commit?: Commit) {
    if (commit) {
      this.selectedItem = commit;
    }

    this.router.navigate(['/commit-history', this.selectedItem.id]);
  }

  checkout() {
    this.service.checkout(this.selectedItem.id)
      .subscribe(() => {
        this.snackBar
          .open('Commit has been checked out',
            'Dismiss',
            {duration: 5000}
          );
      });
  }
}
