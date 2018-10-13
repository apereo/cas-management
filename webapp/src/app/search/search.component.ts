import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceItem} from '../../domain/service-item';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Messages} from '../messages';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SearchService} from './SearchService';
import {PaginatorComponent} from '../paginator/paginator.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  displayedColumns = ['name', 'serviceId', 'description'];
  dataSource: MatTableDataSource<ServiceItem>;
  query: String;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(public messages: Messages,
              public router: Router,
              public route: ActivatedRoute,
              public location: Location,
              private service: SearchService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.route.queryParamMap
        .subscribe((params: ParamMap) => this.service.search(params.get('query'))
          .subscribe(resp => this.dataSource.data = resp));
  }

  serviceEdit(id: number) {
    this.router.navigate(['form', id]);
  }

}

