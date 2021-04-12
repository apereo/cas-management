import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {AppConfigService, ControlsService, PaginatorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {DiffEntry} from '@apereo/mgmt-lib/src/lib/model';
import {BaseHistoryComponent} from '../base-history.component';
import {ChangesService} from '../changes/changes.service';
import {HistoryService} from '../history/history.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MediaObserver} from '@angular/flex-layout';

/**
 * Component to review commit the changes in a commit of the repository.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-commit-history',
  templateUrl: './commit-history.component.html',
  styleUrls: ['./commit-history.component.css']
})
export class CommitHistoryComponent extends BaseHistoryComponent<DiffEntry> implements OnInit {

  displayedColumns = ['actions', 'name', 'message', 'committer', 'time'];
  dataSource: MatTableDataSource<DiffEntry>;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  commit: string;

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
   * Extracts commit changes form the resolver and loads it into the table.
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
    this.route.params.subscribe((params) => this.commit = params.id);
    this.setColumns();
    this.mediaObserver.asObservable().subscribe(() => this.setColumns());
    this.controls.resetButtons();
  }

  /**
   * Sets the columns to be displayed based on the screen size.
   */
  setColumns() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.displayedColumns = ['actions', 'name', 'message'];
    } else {
      this.displayedColumns = ['actions', 'name', 'message', 'committer', 'time'];
    }
  }

  /**
   * Reverts the service to the selected change.
   */
  revert() {
    this.service.revert(this.selectedItem.oldId)
      .subscribe(
        () => this.app.showSnackBar('Service successfully restored from history.')
      );
  }

  /**
   * Returns true if first commit for a service.
   */
  first(): boolean {
    return this.selectedItem && this.selectedItem.commit === this.commit;
  }
}


