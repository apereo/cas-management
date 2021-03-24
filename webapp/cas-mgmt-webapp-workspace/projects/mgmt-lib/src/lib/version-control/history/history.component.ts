import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AppConfigService, ControlsService, PaginatorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {History} from '@apereo/mgmt-lib/src/lib/model';
import { MatTableDataSource } from '@angular/material/table';
import {BaseHistoryComponent} from '../base-history.component';
import {ChangesService} from '../changes/changes.service';
import {HistoryService} from '../history/history.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MediaObserver} from '@angular/flex-layout';

/**
 * Component to display the history for a service in the repository.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent extends BaseHistoryComponent<History> implements OnInit {

  displayedColumns = ['actions', 'message', 'committer', 'time'];
  dataSource: MatTableDataSource<History>;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  fileName: string;

  constructor(changes: ChangesService,
              service: HistoryService,
              dialog: MatDialog,
              router: Router,
              route: ActivatedRoute,
              mediaObserver: MediaObserver,
              app: AppConfigService,
              protected controls: ControlsService,
              viewRef: ViewContainerRef) {
    super(changes, service, dialog, router, route, mediaObserver, app, viewRef);
    this.controls.title = 'History';
    this.controls.icon = 'history';
  }

  /**
   * Extracts the history form the resolver and loads it into the table.
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: History[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
    this.route.params.subscribe((params) => this.fileName = params.fileName);
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
    this.controls.resetButtons();
  }

  /**
   * Sets the columns to be displayed based on the screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'message'];
    } else {
      this.displayedColumns = ['actions', 'message', 'committer', 'time'];
    }
  }

  /**
   * Returns true if selectedItem is at top of list.
   */
  first(): boolean {
    return this.selectedItem && this.dataSource.data.indexOf(this.selectedItem) === 0;
  }

  /**
   * Returns true if selectedItem is at bottom of list.
   */
  last(): boolean {
    return this.selectedItem && this.dataSource.data.indexOf(this.selectedItem) === this.dataSource.data.length - 1;
  }

}
