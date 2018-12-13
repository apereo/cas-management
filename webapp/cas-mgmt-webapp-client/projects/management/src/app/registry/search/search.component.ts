import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceItem, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SearchService} from './SearchService';
import {ViewComponent} from '../../project-share/view/view.component';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'description'];

  selectedItem: ServiceItem;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public router: Router,
              public route: ActivatedRoute,
              public location: Location,
              private service: SearchService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public spinner: SpinnerService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator.paginator;
  }

  serviceEdit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['/form', this.selectedItem.assignedId]);
  }

  viewJson() {
    this.spinner.start("Loading json");
    this.service.getJson(+this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(f => this.openView(f, 'hjson', 'eclipse'));
  }

  viewYaml() {
    this.spinner.start('Loading yaml');
    this.service.getYaml(+this.selectedItem.assignedId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(f => this.openView(f, 'yaml', 'eclipse'));
  }

  openView(text: String, mode: string, theme: string) {
    this.dialog.open(ViewComponent, {
      data: [text, mode, theme],
      width: '900px',
      position: {top: '50px'}
    });
  }

  doSearch(query: string) {
    this.spinner.start('Searching');
    this.service.search(query)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.dataSource.data = resp);
  }

}

