import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {Location} from '@angular/common';
import {ChangesService} from '../changes/changes.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {DiffEntry} from '../../domain/diff-entry';
import {PaginatorComponent} from '../paginator/paginator.component';

@Component({
  selector: 'app-commit-history',
  templateUrl: './commit-history.component.html',
  styleUrls: ['./commit-history.component.css']
})
export class CommitHistoryComponent implements OnInit {

  displayedColumns = ['actions', 'path', 'message', 'committer', 'time'];
  dataSource: MatTableDataSource<DiffEntry>;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  fileName: String;

  selectedItem: DiffEntry;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: CommitHistoryService,
              private changeService: ChangesService,
              private location: Location,
              public  snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
        if (!data.resp) {
          this.snackBar.open(this.messages.management_services_status_listfail, 'dismiss', {
              duration: 5000
          });
        }
        setTimeout(() => {
          this.dataSource.data = data.resp;
        }, 10);
      });
    this.route.params.subscribe((params) => this.fileName = params['fileName']);
  }

  viewChange() {
    this.router.navigate(['/view', this.selectedItem.oldId]);
  }

  checkout() {
    this.service.checkout(this.selectedItem.commit as string, this.selectedItem.path)
      .then(resp => this.snackBar.open('Service successfully restored from history.', 'dismiss', {
        duration: 5000
      }));
  }

  revert() {
    this.service.revertRepo(this.selectedItem.oldId as string)
      .then(resp => this.snackBar.open('Service successfully restored from history.', 'dismiss', {
        duration: 5000
      }));
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


