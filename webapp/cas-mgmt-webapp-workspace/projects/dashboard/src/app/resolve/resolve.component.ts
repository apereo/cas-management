import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import {MatTableDataSource} from '@angular/material/table';
import {Attribute} from '../release/release.component';
import {PaginatorComponent} from 'shared-lib';

@Component({
  selector: 'app-resolve',
  templateUrl: './resolve.component.html',
  styleUrls: ['./resolve.component.css']
})
export class ResolveComponent implements OnInit {

  dataSource: MatTableDataSource<Attribute>;
  displayedColumns = ['key', 'values'];

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
  }

  resolve(uid: string) {
    this.service.getResolve(uid).subscribe(attr => {
      this.dataSource.data = Object.keys(attr).map(k => new Attribute(k, attr[k]));
    });
  }
}


