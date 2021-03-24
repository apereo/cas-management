import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {PaginatorComponent} from '@apereo/mgmt-lib';
import {AuditLog} from '../domain/audit.model';
import {SearchComponent} from './search/search.component';
import {MediaObserver} from '@angular/flex-layout';

/**
 * Component to display results from searching audit records.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  dataSource: MatTableDataSource<AuditLog>;
  displayedColumns = ['timestamp', 'server', 'principal', 'clientip', 'actionPerformed', 'resource'];

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: DashboardService,
              private dialog: MatDialog,
              private mediaObserver: MediaObserver) { }

  /**
   * Starts the component by opening search dialog.
   */
  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.search();
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
  }

  /**
   * Sets the columns to display based on the screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['timestamp', 'server', 'principal', 'clientip', 'actionPerformed'];
    } else {
      this.displayedColumns = ['timestamp', 'server', 'principal', 'clientip', 'actionPerformed', 'resource'];
    }
  }

  /**
   * Opens the search dialog to allow user to enter search parameters.
   */
  search() {
    this.dialog.open(SearchComponent, {
      width: '500px',
      position: {top: '100px'}
    }).afterClosed().subscribe(data => {
      if (data) {
        this.service.getAudit(data).subscribe(e => {
          this.dataSource.data = e;
          if (data.download) {
            this.download();
          }
        });
      }
    });
  }

  /**
   * Fetches results into a downloaded file.
   */
  download() {
    window.open('../api/dashboard/audit/download', '_blank');
  }

  /**
   * Filters the table based input from view.
   *
   * @param val - text to filter table by
   */
  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

}
