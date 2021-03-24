import {Component, ViewContainerRef} from '@angular/core';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';
import {HistoryItem} from './history-item.model';
import {ChangesService} from './changes/changes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoryService} from './history/history.service';
import {HttpResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MediaObserver} from '@angular/flex-layout';

/**
 * Vas.
 */
@Component({
  selector: 'lib-base-history',
  template: ''
})
export class BaseHistoryComponent<T extends HistoryItem> {

  selectedItem: T;

  constructor(protected changes: ChangesService,
              protected service: HistoryService,
              protected dialog: MatDialog,
              protected router: Router,
              protected route: ActivatedRoute,
              public mediaObserver: MediaObserver,
              protected app: AppConfigService,
              protected viewRef: ViewContainerRef) {
  }

  /**
   * Checksout the selected version to be the working change of the service.
   */
  checkout() {
    this.service.checkout(this.selectedItem.commit, this.selectedItem.path)
      .subscribe(() => this.app.showSnackBar('Service successfully restored from history.'));
  }

  /**
   * Views the changes made by this the selected version.
   */
  viewChangeMade() {
    this.changes.change(this.selectedItem.commit, this.selectedItem.path)
      .subscribe(resp => this.handleDiff(resp),
        (error) => this.app.showSnackBar(error.error));
  }

  /**
   * Gets the difference of this version and what is the current version of the service and displays the diff.
   */
  viewDiff() {
    this.changes.toHead(this.selectedItem.commit, this.selectedItem.path)
      .subscribe(resp => this.handleDiff(resp),
        (error) => this.app.showSnackBar(error.error));
  }

  /**
   * Gets the json of the selected version and displays it.
   */
  viewJSON() {
    this.changes.viewJson(this.selectedItem.oldId)
      .subscribe(f => this.app.openView(f, 'hjson', 'eclipse'));
  }

  /**
   * Gets the yaml of the selected version and displays it.
   */
  viewYaml() {
    this.changes.viewYaml(this.selectedItem.oldId)
      .subscribe(f => this.app.openView(f, 'yaml', 'eclipse'));
  }

  /**
   * Handles the response from retrieving diff from server.
   *
   * @param resp - HttpResponse
   */
  handleDiff(resp: HttpResponse<string>) {
    if (resp.status !== 200) {
      this.app.showSnackBar('No Difference');
    } else {
      this.app.openView(resp.body, 'diff', 'github');
    }
  }

}
