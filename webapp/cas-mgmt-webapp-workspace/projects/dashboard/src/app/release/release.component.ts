import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {PaginatorComponent} from 'shared-lib';
import {DialogComponent} from './dialog/dialog.component';

export class Attribute {
  key: string;
  values: string[];

  constructor(key: string, values: string[]) {
    this.key = key;
    this.values = values;
  }
}

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {

  dataSource: MatTableDataSource<Attribute>;
  displayedColumns = ['key', 'values'];

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  constructor(private service: DashboardService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.resolve();
  }

  resolve() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.service.getRelease(data).subscribe(attr => {
          this.dataSource.data = Object.keys(attr).map(k => new Attribute(k, attr[k]));
        });
      }
    });
  }
}
