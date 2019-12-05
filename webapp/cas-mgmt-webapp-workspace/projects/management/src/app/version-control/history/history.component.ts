import {Component, OnInit, ViewChild} from '@angular/core';
import {History} from 'domain-lib';
import {PaginatorComponent, ViewComponent} from 'shared-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoryService} from './history.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ChangesService} from '../changes/changes.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns = ['actions', 'message', 'committer', 'time'];
  dataSource: MatTableDataSource<History>;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  fileName: string;

  selectedItem: History;

  constructor(private route: ActivatedRoute,
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
    this.route.params.subscribe((params) => this.fileName = params.fileName);
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
    this.service.checkout(this.selectedItem.commit, this.selectedItem.path)
      .subscribe(() => this.showSnackbar('Service successfully restored from history.'));
  }

  viewChangeMade() {
    this.service.change(this.selectedItem.commit, this.selectedItem.path)
      .subscribe(resp => this.handleDiff(resp),
        (error) => this.snackBar.open(error.error, 'Dismiss'));
  }

  viewDiff() {
    this.service.toHead(this.selectedItem.commit, this.selectedItem.path)
      .subscribe(resp => this.handleDiff(resp),
        (error) => this.snackBar.open(error.error, 'Dismiss'));
  }

  viewJSON() {
    this.changeService.viewJson(this.selectedItem.id)
      .subscribe(f => this.openView(f, 'hjson', 'eclipse'));
  }

  viewYaml() {
    this.changeService.viewYaml(this.selectedItem.id)
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
