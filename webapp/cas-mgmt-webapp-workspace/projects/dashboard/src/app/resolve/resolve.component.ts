import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import { MatTableDataSource } from '@angular/material/table';
import {Attribute} from '../release/release.component';
import {ControlsService, PaginatorComponent} from '@apereo/mgmt-lib';
import {DialogForm} from './dialog/dialog.form';
import {DialogComponent} from '../release/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

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
export class ResolveComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Attribute>;
  displayedColumns = ['key', 'values'];

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  form = new DialogForm();

  subscription: Subscription;

  constructor(private service: DashboardService,
              private controls: ControlsService,
              private dialog: MatDialog) {
    this.controls.title = 'Resolve Attributes';
    this.controls.icon = 'list';
  }

  /**
   * Starts component with blank view.
   */
  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.controls.resetButtons();
    this.controls.showLookup = true;
    this.subscription = this.controls.lookup.subscribe( () => this.resolve() );
    this.resolve();
  }

  /**
   * Destroy the subscription.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Resolves attributes for the passed userid.
   */
  resolve() {
    this.dialog.open(DialogComponent, {
      width: '500px',
      position: {top: '100px'}
    }).afterClosed().subscribe(data => {
      if (data) {
        this.service.getResolve(data.username).subscribe(attr => {
          this.dataSource.data = Object.keys(attr).map(k => new Attribute(k, attr[k]));
        });
      }
    });
  }
}


