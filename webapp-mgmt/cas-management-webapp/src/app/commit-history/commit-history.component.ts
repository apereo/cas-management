import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {DiffEntry} from '../../domain/diff-entry';
import {PaginatorComponent} from '../paginator/paginator.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DiffViewComponent} from '../diff-view/diff-view.component';
import {ChangesService} from '../changes/changes.service';

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

  commit: String;

  selectedItem: DiffEntry;


  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: CommitHistoryService,
              private changeService: ChangesService,
              public  snackBar: MatSnackBar,
              public breakObserver: BreakpointObserver,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
    this.route.params.subscribe((params) => this.commit = params['id']);
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

  viewChangeMade() {
    this.service.change(this.selectedItem.commit, this.selectedItem.path)
      .subscribe(f => {
        this.dialog.open(DiffViewComponent, {
          data: [f, 'diff', 'github'],
          width: '900px',
          position: {top: '50px'}
        })
      });
  }

  viewDiff() {
    this.service.toHead(this.selectedItem.commit, this.selectedItem.path)
      .subscribe(f => {
        this.dialog.open(DiffViewComponent, {
          data: [f, 'diff', 'github'],
          width: '900px',
          position: {top: '50px'}
        })
      },
        (error) => {console.log(error); this.snackBar.open(error.error, 'Dismiss')});
  }

  viewJSON() {
    this.changeService.viewJson(this.selectedItem.oldId)
      .subscribe(f => {
        this.dialog.open(DiffViewComponent, {
          data: [f, 'hjson', 'eclipse'],
          width: '900px',
          position: {top: '50px'}
        })
      });
  }

  viewYaml() {
    this.changeService.viewYaml(this.selectedItem.oldId)
      .subscribe(f => {
        this.dialog.open(DiffViewComponent, {
          data: [f, 'yaml', 'eclipse'],
          width: '900px',
          position: {top: '50px'}
        })
      });
  }

  first(): boolean {
    return this.selectedItem && this.selectedItem.commit === this.commit;
  }
}


