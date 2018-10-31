import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceItem, PaginatorComponent} from 'mgmt-lib';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SearchService} from './SearchService';
import {DiffViewComponent} from '../diff-view/diff-view.component';

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
              public dialog: MatDialog) { }

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
    this.service.getJson(+this.selectedItem.assignedId)
      .subscribe(f => {
        this.dialog.open(DiffViewComponent, {
          data: [f, 'hjson', 'eclipse'],
          width: '900px',
          position: {top: '50px'}
        })
      });
  }

  viewYaml() {
    this.service.getYaml(+this.selectedItem.assignedId)
      .subscribe(f => {
        this.dialog.open(DiffViewComponent, {
          data: [f, 'yaml', 'eclipse'],
          width: '900px',
          position: {top: '50px'}
        })
      });
  }

  doSearch(query: string) {
    this.service.search(query).subscribe(resp => this.dataSource.data = resp);
  }

}

