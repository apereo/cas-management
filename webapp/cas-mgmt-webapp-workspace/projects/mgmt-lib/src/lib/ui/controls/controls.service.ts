import {EventEmitter, Injectable} from '@angular/core';
import {Change, Commit, GitStatus} from '@apereo/mgmt-lib/src/lib/model';
import {Service} from '../service';
import {Observable} from 'rxjs/internal/Observable';


/**
 * Service to handle requests to the server for application controls.
 *
 * @author Travis Schmidt
 */
@Injectable({
  providedIn: 'root'
})
export class ControlsService extends Service {

  status: GitStatus;

  icon: string;
  title: string;

  showEdit: boolean;

  showRefresh: boolean;

  showOpen: boolean;

  showVersionControl = true;

  saveEnabled = false;

  showSpinner = false;

  showBack = true;

  showEditorOptions = false;

  showNew = false;

  showLookup = false;

  showPreview = false;

  save: EventEmitter<void> = new EventEmitter<void>();

  openFile: EventEmitter<any> = new EventEmitter<any>();

  refresh: EventEmitter<void> = new EventEmitter<void>();

  reset: EventEmitter<void> = new EventEmitter<void>();

  newService: EventEmitter<void> = new EventEmitter<void>();

  editorOptions: EventEmitter<void> = new EventEmitter<void>();

  lookup: EventEmitter<void> = new EventEmitter<void>();

  preview: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Resets which controls are shown to the default.
   */
  resetButtons(): void {
    this.showEdit = false;
    this.showRefresh = false;
    this.showOpen = false;
    this.showVersionControl = true;
    this.saveEnabled = false;
    this.showSpinner = false;
    this.showBack = true;
    this.showEditorOptions = false;
    this.showLookup = false;
    this.showNew = false;
    this.showPreview = false;
  }

  /**
   * Sets a timer to call the server every minute to check for repository status.
   */
  callStatus() {
    setTimeout(() => {
      this.gitStatus();
      this.callStatus();
    }, 60 * 1000);
  }

  /**
   * Calls the server to commit open changes.
   *
   * @param msg - commit message
   */
  commit(msg: string): Observable<string> {
    return this.post('api/commit', msg, 'Committing');
  }

  /**
   * Calls the server to publish unpublished commits to CAS servers.
   */
  publish(): Observable<string> {
    return this.getText('api/commit/publish', 'Publishing');
  }

  /**
   * Calls the server to submit user's working changes to admins.
   *
   * @param msg - commit message
   */
  submit(msg): Observable<string> {
    return this.postText('api/submit', msg, 'Submitting');
  }

  /**
   * Calls the server to get a list of untracked changes in the repository.
   */
  untracked(): Observable<Change[]> {
    return this.get<Change[]>('api/change/untracked');
  }

  /**
   * Calls the server to get a list of uncommitted
   */
  getCommits(): Observable<Commit[]> {
    return this.get<Commit[]>('api/commit/unpublished');
  }

  /**
   * Calls the server to get the git status.
   */
  gitStatus() {
    this.get<GitStatus>('api/commit/status')
      .subscribe(resp => this.status = resp);
  }

  /**
   * Calls the server to execute the sync script.
   */
  sync(): Observable<string> {
    return this.getText( 'api/commit/sync', 'Syncing');
  }

}
