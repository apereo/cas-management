import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {UserService, AppConfigService} from 'shared-lib';
import {Commit} from 'domain-lib';
import {Location} from '@angular/common';
import {PublishComponent} from '../publish/publish.component';
import {CommitComponent} from '../commit/commit.component';
import {ControlsService} from './controls.service';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: [ './controls.component.css' ]
})

export class ControlsComponent implements OnInit {

  @Input()
  showEdit: boolean;

  @Input()
  showRefresh: boolean;

  @Input()
  showOpen: boolean;

  @Input()
  showVersionControl = true;

  @Input()
  saveEnabled = false;

  @Input()
  showSpinner = false;

  @Input()
  showBack = true;

  @Input()
  showEditorOptions = false;

  @Input()
  showNew = false;

  @ViewChild('publishModal', { static: true })
  submitComp: PublishComponent;

  @Output()
  save: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  openFile: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  refresh: EventEmitter<void> = new EventEmitter<void>();

  // tslint:disable-next-line:no-output-native
  @Output()
  reset: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  newService: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  editorOptions: EventEmitter<void> = new EventEmitter<void>();

  constructor(public service: ControlsService,
              public userService: UserService,
              public appService: AppConfigService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public location: Location) { }

  ngOnInit() {
    if (this.appService.config.versionControl && this.showVersionControl) {
      this.service.gitStatus();
    }
  }

  goBack() {
    this.location.back();
  }

  openModalCommit() {
      const dialogRef = this.dialog.open(CommitComponent, {
          data: [this.service.status, this.userService.user.administrator],
          width: '500px',
          position: {top: '100px'}
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.commit(result);
          }
      });
  }

  commit(msg: string) {
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

  handleCommit() {
    this.service.gitStatus();
    this.showSnackbarAndRefresh('Service changes successfully committed.', true);
  }

  handleNotCommitted() {
    this.showSnackbarAndRefresh(
      'A problem has occurred while trying to commit service changes. Please check system logs for additional information.',
      true
    );
  }

  openModalPublish() {
      const dialogRef = this.dialog.open(PublishComponent, {
          width: '500px',
          position: {top: '100px'}
      });
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.publish(result);
          }
      });
  }

  publish(commits: Commit[]) {
    if (commits.length > 0 ) {
      this.service.publish()
        .subscribe(
          () => this.handlePublish(),
          () => this.handleNotPublished()
        );
    }
  }

  handlePublish() {
    this.service.gitStatus();
    this.showSnackbarAndRefresh('Service changes successfully published.', true);
  }

  handleNotPublished() {
    this.showSnackbarAndRefresh(
      'A problem has occurred while trying to publish services to CAS nodes.  Please check system logs for additional information.',
      false
    );
  }

  callSubmit() {
    this.openModalCommit();
  }

  submit(msg: string) {
    this.service.submit(msg)
      .subscribe(
        () => this.handleSubmit(),
        () => this.handleNotSubmitted()
      );
  }

  handleSubmit() {
    this.service.gitStatus();
    this.showSnackbarAndRefresh('Your commit has been submitted for review', true);
  }

  handleNotSubmitted() {
    this.showSnackbarAndRefresh('Something went wrong and your commit was not able to be submitted', false);
  }

  isAdmin(): boolean {
    return this.appService.config.versionControl &&
           this.userService.user &&
           this.userService.user.administrator;
  }

  hasChanges(): boolean {
    return this.appService.config.versionControl &&
           this.service.status &&
           this.service.status.hasChanges;
  }


  unpublished(): boolean {
    return this.appService.config.versionControl &&
           this.service.status &&
           this.service.status.unpublished;
  }

  showSnackbarAndRefresh(msg: string, refresh: boolean) {
    this.snackBar.open(msg, 'Dismiss', {duration: 50000});
    if (refresh) {
      this.refresh.emit();
    }
  }
}
