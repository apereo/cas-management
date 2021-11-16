import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AppConfigService, PaginatorComponent, ControlsService, RevertComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {Change} from '@apereo/mgmt-lib/src/lib/model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangesService} from '../changes/changes.service';
import {VersionControlService} from '../version-control.service';
import {Subscription} from 'rxjs';

/**
 * Component to display current uncommitted working changes.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-local-changes',
  templateUrl: './local-changes.component.html',
  styleUrls: ['./local-changes.component.css']
})
export class LocalChangesComponent implements OnInit, OnDestroy {

  selectedItem: Change;
  revertItem: Change;
  displayedColumns = ['actions', 'serviceName', 'serviceType', 'changeType'];
  datasource: MatTableDataSource<Change>;
  loading: boolean;
  subscription: Subscription;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: VersionControlService,
              private controls: ControlsService,
              private changeService: ChangesService,
              public dialog: MatDialog,
              public app: AppConfigService,
              protected viewRef: ViewContainerRef) {
    this.controls.title = 'Working Changes';
    this.controls.icon = 'list';
  }

  /**
   * Extracts the list of changes from the resolver and loads them to the table.
   */
  ngOnInit() {
    this.route.data.subscribe((data: {resp: Change[]}) => {
      this.datasource = new MatTableDataSource(data.resp);
      this.datasource.paginator = this.paginator.paginator;
    });
    this.controls.resetButtons();
    this.controls.showRefresh = true;
    this.controls.showSpinner = true;
    this.subscription = this.controls.refresh.subscribe(() => this.refresh());
  }

  /**
   * Destroy subscription.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Refreshes the changes.
   */
  refresh() {
    this.loading = true;
    this.controls.untracked()
      .subscribe(resp => {
        setTimeout(() => this.loading = false, 1000);
        this.datasource.data = resp ? resp : [];
      });
    this.controls.gitStatus();
  }

  /**
   * Opens the dialog for the Revert Component to confirm reverting the change.
   */
  openModalRevert() {
    this.dialog.open(RevertComponent, {
      data: this.selectedItem,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.revert();
      }
    });
    this.revertItem = this.selectedItem;
  }

  /**
   * Reverts the working change and restores the current version in the repository.
   */
  private revert() {
    if (this.revertItem.changeType === 'ADD') {
      this.service.deleteService(+this.revertItem.id)
        .subscribe(resp => this.handleRevert());
    } else {
      this.service.revert(this.revertItem.fileName)
        .subscribe(resp => this.handleRevert());
    }
  }

  /**
   * Handles the successful call to revert the local change.
   */
  private handleRevert() {
    this.refresh();
    this.app.showSnackBar('Change has been reverted');
  }

  /**
   * Gets the difference between the working change and currently committed change and displays a diff.
   */
  viewDiff() {
    this.changeService.viewDiff(this.selectedItem.oldId, this.selectedItem.newId)
      .subscribe(resp => this.app.openView(resp, 'diff', 'github'));
  }

  /**
   * Gets the currently committed version of the service as json and displays it.
   */
  viewJSON() {
    const id = this.selectedItem.changeType === 'DELETE' ? this.selectedItem.oldId : this.selectedItem.newId;
    this.changeService.viewJson(id)
      .subscribe(resp => this.app.openView(resp, 'hjson', 'eclipse'));
  }

  /**
   * Gets the currently committed version of the service as yaml and displays it.
   */
  viewYaml() {
    const id = this.selectedItem.changeType === 'DELETE' ? this.selectedItem.oldId : this.selectedItem.newId;
    this.changeService.viewYaml(id)
      .subscribe(resp => this.app.openView(resp, 'yaml', 'eclipse'));
  }

}
