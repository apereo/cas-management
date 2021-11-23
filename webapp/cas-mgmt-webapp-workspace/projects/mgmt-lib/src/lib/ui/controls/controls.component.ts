import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {Commit} from '@apereo/mgmt-lib/src/lib/model';
import {Location} from '@angular/common';
import {PublishComponent} from '../publish/publish.component';
import {CommitComponent} from '../commit/commit.component';
import {ControlsService} from './controls.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AppConfigService} from '../app-config.service';
import {UserService} from '../user.service';
import { CurrentUserDialog } from '../current-user/current-user-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';

/**
 * Component that displays and emits events for work flow controls in the application.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-controls',
  templateUrl: './controls.component.html',
  styleUrls: [ './controls.component.css' ]
})

export class ControlsComponent implements OnInit {

  @ViewChild('publishModal', { static: true })
  submitComp: PublishComponent;

  constructor(public service: ControlsService,
              public userService: UserService,
              public appService: AppConfigService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public location: Location) { }

  /**
   * Starts the component by retrieving git status if version control is configured.
   */
  ngOnInit() {
    setTimeout(() => {
      if (this.appService.config.versionControl && this.service.showVersionControl) {
        this.service.gitStatus();
      }
    }, 10);
  }

  /**
   * Navigates the router to the previous location.
   */
  goBack() {
    this.location.back();
  }

  /**
   * Opens a modal with user information
   */

  showUser(): void {
    const dialogRef = this.dialog.open(CurrentUserDialog, {
      width: '720px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  /**
   * Opens the commit dialog for admins to commit changes.
   */
  openModalCommit() {
    this.dialog.open(CommitComponent, {data: [this.service.status, this.userService.user.administrator]})
      .afterClosed().subscribe(result => {
        if (result) {
          this.commit(result);
        }
      });
  }

  /**
   * Logs the user out the application.
   */
  logout() {
    window.location.href = '../logout.html';
  }

  /**
   * Inspects result from commit dialog and takes action.
   *
   * @param msg - commit message or action.
   */
  private commit(msg: string) {
    if (msg === 'CANCEL') {
      return;
    } else if (!this.userService.user.administrator) {
      this.submit(msg);
    } else {
      if (msg !== null && msg !== '') {
        this.service.commit(msg)
          .subscribe(
            () => this.handleCommit(),
            () => this.handleNotCommitted()
          );
      }
    }
  }

  /**
   * Handles the return of a successful call to commit changes to the repository.
   */
  handleCommit() {
    this.service.gitStatus();
    this.showSnackbarAndRefresh('Service changes successfully committed.', true);
  }

  /**
   * Handles unsuccessful calls to the server attempting to commit changes to the repository.
   */
  handleNotCommitted() {
    this.showSnackbarAndRefresh(
      'A problem has occurred while trying to commit service changes. Please check system logs for additional information.',
      true
    );
  }


  /**
   * Opens dialog for publish component to confirm publishing changes to the CAS servers.
   */
  openModalPublish() {
    this.dialog.open(PublishComponent)
      .afterClosed().subscribe(result => {
        if (result) {
          this.publish(result);
        }
      });
  }

  /**
   * Calls the server to publish changes to the CAS servers.
   *
   * @param commits - list of commits to publish
   */
  private publish(commits: Commit[]) {
    if (commits.length > 0 ) {
      this.service.publish()
        .subscribe(
          () => this.handlePublish(),
          () => this.handleNotPublished()
        );
    }
  }

  /**
   * Handles successful call to the server publishing changes to CAS servers.
   */
  private handlePublish() {
    this.service.gitStatus();
    this.showSnackbarAndRefresh('Service changes successfully published.', true);
  }

  /**
   * Handles unsuccesful call to the server attempting to publish changes to CAS servers.
   */
  private handleNotPublished() {
    this.showSnackbarAndRefresh(
      'A problem has occurred while trying to publish services to CAS nodes.  Please check system logs for additional information.',
      false
    );
  }

  /**
   * Calls the server to submit the changes to be a pull request for the admin to accept.
   *
   * @param msg - Commit message
   */
  private submit(msg: string) {
    this.service.submit(msg)
      .subscribe(
        () => this.handleSubmit(),
        () => this.handleNotSubmitted()
      );
  }

  /**
   * Handles successful calls to the server for submitting changes to admin.
   */
  private handleSubmit() {
    this.service.gitStatus();
    this.showSnackbarAndRefresh('Your commit has been submitted for review', true);
  }

  /**
   * Handles unsuccessful calls to the server attempting to submit changes to admin.
   */
  private handleNotSubmitted() {
    this.showSnackbarAndRefresh('Something went wrong and your commit was not able to be submitted', false);
  }

  /**
   * Returns true if user is an admin.
   */
  isAdmin(): boolean {
    return this.appService.config.versionControl &&
           this.userService.user &&
           this.userService.user.administrator;
  }

  /**
   * Returns true if there are uncommitted changes in the repository.
   */
  hasChanges(): boolean {
    return this.appService.config.versionControl &&
           this.service.status &&
           this.service.status.hasChanges;
  }

  /**
   * Returns true if there are unpublished commits in the repository.
   */
  unpublished(): boolean {
    return this.appService.config.versionControl &&
           this.service.status &&
           this.service.status.unpublished;
  }

  /**
   * Shows the snackbar with the passed message.
   *
   * @param msg - message to show
   * @param refresh - if refresh event should be emitted
   */
  showSnackbarAndRefresh(msg: string, refresh: boolean) {
    this.appService.showSnackBar(msg);
    if (refresh) {
      this.service.refresh.emit();
    }
  }
}
