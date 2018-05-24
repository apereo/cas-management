import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {DiffEntry} from '../../domain/diff-entry';
import {PaginatorComponent} from '../paginator/paginator.component';

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
              public  snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
    this.route.params.subscribe((params) => this.fileName = params['fileName']);
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


