import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DashboardService} from '../core/dashboard-service';
import {MatTableDataSource} from '@angular/material';
import {Attribute} from '../release/release.component';
import {PaginatorComponent} from 'shared-lib';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  dataSource: MatTableDataSource<Attribute>;
  displayedColumns = ['key', 'values'];
  keys = ['CAS Version', 'CAS Branch', 'CAS Commit Id', 'CAS Build Date/Time', 'Spring Boot Version', 'Spring Version'];

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  constructor(private service: DashboardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Map<string, string>}) => {
      const d = this.keys.map(k => new Attribute(k, data.resp[k]));
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

}
