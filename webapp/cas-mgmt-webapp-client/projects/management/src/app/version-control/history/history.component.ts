import {Component, OnInit, ViewChild} from '@angular/core';
import {History, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoryService} from './history.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ViewComponent} from '@app/project-share';
import {ChangesService} from '../changes/changes.service';
import {finalize} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

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

  fileName: string;

  selectedItem: History;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: HistoryService,
              public  snackBar: MatSnackBar,
              public breakObserver: BreakpointObserver,
              public dialog: MatDialog,
              public changeService: ChangesService,
              public spinner: SpinnerService) {
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
    this.router.navigate(['form/view', this.selectedItem.id]);
  }

  checkout() {
    this.spinner.start('Checking out verison');
    this.service.checkout(this.selectedItem.commit, this.selectedItem.path)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(() => this.showSnackbar('Service successfully restored from history.'));
  }

  viewChangeMade() {
    this.spinner.start('Loading change');
    this.service.change(this.selectedItem.commit, this.selectedItem.path)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.handleDiff(resp),
        (error) => this.snackBar.open(error.error, 'Dismiss'));
  }

  viewDiff() {
    this.spinner.start('Loading diff');
    this.service.toHead(this.selectedItem.commit, this.selectedItem.path)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.handleDiff(resp),
        (error) => this.snackBar.open(error.error, 'Dismiss'));
  }

  viewJSON() {
    this.spinner.start('Loading json');
    this.changeService.viewJson(this.selectedItem.id)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(f => this.openView(f, 'hjson', 'eclipse'));
  }

  viewYaml() {
    this.spinner.start('Loading yaml');
    this.changeService.viewYaml(this.selectedItem.id)
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
    return this.selectedItem && this.dataSource.data.indexOf(this.selectedItem) === 0;
  }

  last(): boolean {
    return this.selectedItem && this.dataSource.data.indexOf(this.selectedItem) === this.dataSource.data.length - 1;
  }

  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Dismiss', {duration: 5000});
  }

  handleDiff(resp: HttpResponse<string>) {
    if (resp.status !== 200) {
      this.showSnackbar('No Difference');
    } else {
      this.openView(resp.body, 'diff', 'github');
    }
  }
}
