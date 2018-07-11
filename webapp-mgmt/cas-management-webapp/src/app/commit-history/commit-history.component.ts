import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {DiffEntry} from '../../domain/diff-entry';
import {PaginatorComponent} from '../paginator/paginator.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-commit-history',
  templateUrl: './commit-history.component.html',
  styleUrls: ['./commit-history.component.css']
})
export class CommitHistoryComponent implements OnInit {

  displayedColumns = ['actions', 'name', 'message', 'committer', 'time'];
  dataSource: MatTableDataSource<DiffEntry>;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  fileName: String;

  selectedItem: DiffEntry;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: CommitHistoryService,
              public  snackBar: MatSnackBar,
              public breakObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
    this.route.params.subscribe((params) => this.fileName = params['fileName']);
    this.breakObserver.observe(['(max-width: 499px)'])
      .subscribe(r => {
        if (r.matches) {
          this.displayedColumns = ['actions', 'name', 'message'];
        } else {
          this.displayedColumns = ['actions', 'name', 'message', 'committer', 'time'];
        }
      });
  }

  viewChange() {
    this.router.navigate(['/view', this.selectedItem.oldId]);
  }

  checkout() {
    this.service.checkout(this.selectedItem.commit as string, this.selectedItem.path)
      .subscribe(
        resp => this.snackBar
          .open('Service successfully restored from history.',
                'dismiss',
                {duration: 5000}
          )
      );
  }

  revert() {
    this.service.revertRepo(this.selectedItem.oldId as string)
      .subscribe(
        resp => this.snackBar
          .open('Service successfully restored from history.',
            'dismiss',
            {duration: 5000}
          )
      );
  }

  viewDiff() {
    this.router.navigate(['/diff', {oldId: this.selectedItem.oldId, newId: this.selectedItem.newId}]);
  }

  viewJSON() {
    this.router.navigate(['/viewJson', this.selectedItem.oldId]);
  }

  viewYaml() {
    this.router.navigate(['/viewYaml', this.selectedItem.oldId]);
  }
}


