import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import { MatTableDataSource } from '@angular/material/table';
import {Attribute} from '../release/release.component';
import {ControlsService, PaginatorComponent} from '@apereo/mgmt-lib';

/**
 * Component for resolving attributes for a userid.
 *
 * @author Travis Schmidt
 */
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

  constructor(private service: DashboardService,
              private controls: ControlsService) { }

  /**
   * Starts component with blank view.
   */
  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.controls.resetButtons();
    this.controls.title = 'Resolve Attributes';
    this.controls.icon = 'list';
  }

  /**
   * Resolves attributes for the passed userid.
   *
   * @param uid - user id
   */
  resolve(uid: string) {
    this.service.getResolve(uid).subscribe(attr => {
      this.dataSource.data = Object.keys(attr).map(k => new Attribute(k, attr[k]));
    });
  }
}


