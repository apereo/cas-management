import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DashboardService} from '../core/dashboard-service';
import { MatTableDataSource } from '@angular/material/table';
import {Attribute} from '../release/release.component';
import {ControlsService, PaginatorComponent} from '@apereo/mgmt-lib';

/**
 * Component to display version and other details about the deployed CAS instance.
 *
 * @author Travis Schmidt
 */
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

  constructor(private service: DashboardService,
              private controls: ControlsService,
              private route: ActivatedRoute) { }

  /**
   * Starts the component by extracting data from resolver and loading table.
   */
  ngOnInit() {
    this.route.data.subscribe((data: {resp: Map<string, string>}) => {
      const d = this.keys.map(k => new Attribute(k, data.resp[k]));
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator.paginator;
    });
    this.controls.resetButtons();
    this.controls.title = 'CAS Server Information';
    this.controls.icon = 'info';
  }

}
