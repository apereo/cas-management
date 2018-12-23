import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommitHistoryService} from './commit-history.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {DiffEntry, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ViewComponent} from '@app/project-share';
import {ChangesService} from '../changes/changes.service';
import {finalize} from 'rxjs/operators';

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

  commit: string;

  selectedItem: DiffEntry;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CommitHistoryService,
              private changeService: ChangesService,
              public  snackBar: MatSnackBar,
              public breakObserver: BreakpointObserver,
              public dialog: MatDialog,
              public spinner: SpinnerService) {
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
    this.router.navigate(['form/view', this.selectedItem.oldId]);
  }

  checkout() {
    this.spinner.start('Checking out change');
    this.service.checkout(this.selectedItem.commit as string, this.selectedItem.path)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(
        resp => this.snackBar
          .open('Service successfully restored from history.',
                'dismiss',
                {duration: 5000}
          )
      );
  }

  revert() {
    this.spinner.start('Reverting change');
    this.service.revert(this.selectedItem.oldId as string)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(
        resp => this.snackBar
          .open('Service successfully restored from history.',
            'dismiss',
            {duration: 5000}
          )
      );
  }

  viewChangeMade() {
    this.spinner.start('Loading change');
    this.service.change(this.selectedItem.commit, this.selectedItem.path)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(f => this.openView(f, 'diff', 'github'));
  }

  viewDiff() {
    this.spinner.start('Loading diff');
    this.service.toHead(this.selectedItem.commit, this.selectedItem.path)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(f => this.openView(f, 'diff', 'github'),
        (error) => this.snackBar.open(error.error.message, 'Dismiss'));
  }

  viewJSON() {
    this.spinner.start('Loading json');
    this.changeService.viewJson(this.selectedItem.oldId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(f => this.openView(f, 'hjson', 'eclipse'));
  }

  viewYaml() {
    this.spinner.start('Loading yaml');
    this.changeService.viewYaml(this.selectedItem.oldId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(f => this.openView(f, 'yaml', 'eclipse'));
  }

  openView(text: string, mode: string, theme: string) {
    this.dialog.open(ViewComponent, {
       data: [text, mode, theme],
       width: '900px',
       position: {top: '50px'}
    });
  }

  first(): boolean {
    return this.selectedItem && this.selectedItem.commit === this.commit;
  }
}


