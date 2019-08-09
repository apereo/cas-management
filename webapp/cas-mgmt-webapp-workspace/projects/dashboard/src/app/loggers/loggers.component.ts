import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {PaginatorComponent} from 'shared-lib';
import {DashboardService} from '../core/dashboard-service';
import {ActivatedRoute} from '@angular/router';
import {Logger} from '../domain/logger';

@Component({
  selector: 'app-loggers',
  templateUrl: './loggers.component.html',
  styleUrls: ['./loggers.component.css']
})
export class LoggersComponent implements OnInit {
  dataSource: MatTableDataSource<Log>;
  displayedColumns = ['server', 'key', 'level'];

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: DashboardService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Map<string, Map<string, Logger>>}) => {
      let l: Log[] = [];
      for (let k of Object.keys(data.resp)) {
        const d = Object.keys(data.resp[k]).map(l => new Log(k, l, (<Logger>data.resp[k][l]).configuredLevel));
        l = l.concat(d);
      }
      this.dataSource = new MatTableDataSource(l.sort((l1, l2) => l1.key.localeCompare(l2.key)));
      this.dataSource.paginator = this.paginator.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  changeLogger(server: string, key: string, level:string) {
    this.service.setLogger({server: server, key: key, level: level}).subscribe(() => {
        this.snackBar.open("Logger level set", "Dismiss",
          {duration: 5000}
          );
      },
      (err) => this.snackBar.open(
        "Unable to set logger level",
        "Dismiss",
        {duration: 5000}
        )
    );
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }
}

export class Log {
  server: string;
  key: string;
  level: string;

  constructor(server: string, key: string, level: string) {
    this.server = server;
    this.key = key;
    this.level = level;
  }
}
