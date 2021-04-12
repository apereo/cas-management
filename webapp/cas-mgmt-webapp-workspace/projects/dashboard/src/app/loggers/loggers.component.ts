import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AppConfigService, ControlsService, PaginatorComponent} from '@apereo/mgmt-lib';
import {DashboardService} from '../core/dashboard-service';
import {ActivatedRoute} from '@angular/router';
import {Logger} from '../domain/logger.model';

/**
 * Log model.
 */
export class Log {
  server: string;
  key: string;
  level: string;

  constructor(server: string,
              key: string,
              level: string) {
    this.server = server;
    this.key = key;
    this.level = level;
  }
}

/**
 * Component to display/update logger levels on the CAS servers.
 *
 * @author Travis Schmidt
 */
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
              private controls: ControlsService,
              private route: ActivatedRoute,
              private app: AppConfigService) {

  }

  /**
   * Extracts data from the resolver and loads the table.
   */
  ngOnInit() {
    this.route.data.subscribe((data: {resp: Map<string, Map<string, Logger>>}) => {
      let logs: Log[] = [];
      for (const k of Object.keys(data.resp)) {
        const d = Object.keys(data.resp[k]).map(l => new Log(k, l, (data.resp[k][l] as Logger).configuredLevel));
        logs = logs.concat(d);
      }
      this.dataSource = new MatTableDataSource(logs.sort((l1, l2) => l1.key.localeCompare(l2.key)));
      this.dataSource.paginator = this.paginator.paginator;
      this.dataSource.sort = this.sort;
    });
    this.controls.resetButtons();
    this.controls.title = 'Logger';
    this.controls.icon = 'list';
  }

  /**
   * Handles changing the log level of a logger.
   *
   * @param server - CAS server in the cluster.
   * @param key - key for the logger
   * @param level - log level
   */
  changeLogger(server: string, key: string, level: string) {
    this.service.setLogger({server, key, level})
      .subscribe(
        () => this.app.showSnackBar('Logger level set'),
        () => this.app.showSnackBar('Unable to set logger level')
      );
  }

  /**
   * Filters the based on the text entered in the view.
   *
   * @param val - text to filter by
   */
  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }
}
