import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoryService} from './history.service';
import {History} from '../../domain/history';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {PaginatorComponent} from '../paginator/paginator.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DiffViewComponent} from '../diff-view/diff-view.component';
import {ChangesService} from '../changes/changes.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns = ['actions', 'message', 'committer', 'time'];
  dataSource: MatTableDataSource<History>;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  fileName: String;

  selectedItem: History;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: HistoryService,
              public  snackBar: MatSnackBar,
              public breakObserver: BreakpointObserver,
              public dialog: MatDialog,
              public changeService: ChangesService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: History[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
    this.route.params.subscribe((params) => this.fileName = params['fileName']);
    this.breakObserver.observe(['(max-width: 499px)'])
      .subscribe(r => {
        if (r.matches) {
          this.displayedColumns = ['actions', 'message'];
        } else {
          this.displayedColumns = ['actions', 'message', 'committer', 'time'];
        }
      });
  }

  viewChange() {
    this.router.navigate(['/view', this.selectedItem.id]);
  }

  checkout() {
    this.service.checkout(this.selectedItem.commit as string, this.selectedItem.path)
      .subscribe(
        () => this.snackBar
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
    this.changeService.viewJson(this.selectedItem.id)
      .subscribe(f => {
        this.dialog.open(DiffViewComponent, {
          data: [f, 'hjson', 'eclipse'],
          width: '900px',
          position: {top: '50px'}
        })
      });
  }

  viewYaml() {
    this.changeService.viewYaml(this.selectedItem.id)
      .subscribe(f => {
        this.dialog.open(DiffViewComponent, {
          data: [f, 'yaml', 'eclipse'],
          width: '900px',
          position: {top: '50px'}
        })
      });
  }

  first(): boolean {
    return this.selectedItem && this.dataSource.data.indexOf(this.selectedItem) == 0;
  }

  last(): boolean {
    return this.selectedItem && this.dataSource.data.indexOf(this.selectedItem) == this.dataSource.data.length -1
  }
}
