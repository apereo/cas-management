import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {ControlsService, PaginatorComponent} from '@apereo/mgmt-lib';
import {DialogComponent} from './dialog/dialog.component';

/**
 * Attribute model.
 */
export class Attribute {
  key: string;
  values: string[];

  constructor(key: string, values: string[]) {
    this.key = key;
    this.values = values;
  }
}

/**
 * Component to test and display attributes that are released by service.
 *
 * @author Travis Schmidt
 */
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
              private controls: ControlsService,
              private dialog: MatDialog) { }

  /**
   * Starts the component by opening dialog to get credentials.
   */
  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.resolve();
    this.controls.resetButtons();
    this.controls.title = 'Attribute Release';
    this.controls.icon = 'list';
  }

  /**
   * Opens dialog to get credentials and service id.
   */
  resolve() {
    this.dialog.open(DialogComponent, {
      width: '500px',
      position: {top: '100px'}
    }).afterClosed().subscribe(data => {
      if (data) {
        this.call(data);
      }
    });
  }

  /**
   * Calls the server with passed credentials loads view.
   *
   * @param data - credentials and service resolve
   */
  private call(data: any) {
    this.service.getRelease(data).subscribe(attr => {
      this.dataSource.data = Object.keys(attr).map(k => new Attribute(k, attr[k]));
    });
  }
}
