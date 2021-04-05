import {EventEmitter, Injectable} from '@angular/core';
import {Service} from '@apereo/mgmt-lib';

/**
 * Service to handle requests to the server for application controls.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class ControlsService extends Service {

  icon: string;
  title: string;

  saveDisabled = true;

  showBack = true;

  showEdit = false;

  showRefresh: boolean;

  showBulk = false;

  showSessions = false;

  bulk = false;

  save: EventEmitter<void> = new EventEmitter<void>();

  refresh: EventEmitter<void> = new EventEmitter<void>();

  bulkAdd: EventEmitter<void> = new EventEmitter<void>();

  bulkRemove: EventEmitter<void> = new EventEmitter<void>();

  bulkRevoke: EventEmitter<void> = new EventEmitter<void>();

  revokeAll: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Resets which controls are shown to the default.
   */
  resetButtons(): void {
    this.saveDisabled = true;
    this.showBack = true;
    this.showEdit = false;
    this.showRefresh = false;
    this.showBulk = false;
    this.showSessions = false;
    this.bulk = false;
  }

}
