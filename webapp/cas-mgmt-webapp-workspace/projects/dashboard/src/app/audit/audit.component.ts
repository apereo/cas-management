import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {PaginatorComponent} from 'shared-lib';
import {AuditLog} from '../domain/audit';
import {SearchComponent} from './search/search.component';

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
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.search();
  }

  search() {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.service.getAudit(data).subscribe(e => {
          this.dataSource.data = e;
        });
      }
    });
  }

  doFilter(val: string) {
    if (!this.dataSource) { return; }
    this.dataSource.filter = val;
  }

}
