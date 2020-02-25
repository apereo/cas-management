import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceItem} from 'domain-lib';
import {PaginatorComponent, ViewComponent} from 'shared-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SearchService} from './search.service';
import {MediaObserver} from '@angular/flex-layout';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'serviceType', 'description'];

  selectedItem: ServiceItem;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public router: Router,
              public route: ActivatedRoute,
              public location: Location,
              public service: SearchService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.service.results || []);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator.paginator;
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(c => this.setColumns());
  }

  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'name', 'serviceId'];
    } else {
      this.displayedColumns = ['actions', 'name', 'serviceId', 'serviceType', 'description'];
    }
  }

  serviceEdit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['form/edit', this.selectedItem.assignedId]);
  }

  viewJson() {
    this.service.getJson(+this.selectedItem.assignedId)
      .subscribe(f => this.openView(f, 'hjson', 'eclipse'));
  }

  viewYaml() {
    this.service.getYaml(+this.selectedItem.assignedId)
      .subscribe(f => this.openView(f, 'yaml', 'eclipse'));
  }

  openView(text: string, mode: string, theme: string) {
    this.dialog.open(ViewComponent, {
      data: [text, mode, theme],
      width: '900px',
      position: {top: '50px'}
    });
  }

  doSearch(query: string) {
    this.service.search(query)
      .subscribe(resp => this.dataSource.data = resp);
  }

}

