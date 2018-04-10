import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {Messages} from '../messages';
import {ControlsService} from './controls.service';
import {Location} from '@angular/common';
import {UserService} from '../user.service';
import {PublishComponent} from '../publish/publish.component';
import {Commit} from '../../domain/commit';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CommitComponent} from '../commit/commit.component';
import {AppConfigService} from '../app-config.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {

  @Input()
  showEdit: boolean;

  @Input()
  showRefresh: boolean;

  @Input()
  showOpen: boolean;

  @Input()
  showVersionControl: boolean = true;

  @Input()
  saveEnabled: boolean = false;

  @ViewChild('publishModal')
  submitComp: PublishComponent;

  @Output()
  save: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  openFile: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(public messages: Messages,
              public service: ControlsService,
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

  commit(msg: String) {
    if (msg === 'CANCEL') {
      return;
    } else if (!this.userService.user.administrator) {
      this.submit(msg);
    } else {
      if (msg !== null && msg !== '') {
        this.service.commit(msg)
          .then(resp => this.handleCommit(resp))
          .catch(e => this.handleNotCommitted(e));
      }
    }
  }

  handleCommit(resp: String) {
    this.service.gitStatus();
    this.snackBar.open(this.messages.management_services_status_committed, 'Dismiss', {
        duration: 5000
    });
    this.refresh.emit();
  }

  handleNotCommitted(e: any) {
    this.snackBar.open(this.messages.management_services_status_notcommitted, 'Dismiss', {
        duration: 5000
    });
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
        .then(resp => this.handlePublish())
        .catch(e => this.handleNotPublished(e));
    }
  }

  handlePublish() {
    this.service.gitStatus();
    this.snackBar.open(this.messages.management_services_status_published, 'Dismiss', {
        duration: 5000
    });
  }

  handleNotPublished(e: any) {
    this.snackBar.open(this.messages.management_services_status_notpublished, 'Dismiss', {
        duration: 5000
    });
  }

  callSubmit() {
    this.openModalCommit();
  }

  submit(msg: String) {
    this.service.submit(msg)
      .then(resp => this.handleSubmit())
      .catch(e => this.handleNotSubmitted(e));
  }

  handleSubmit() {
    this.service.gitStatus();
    this.snackBar.open('Your commit has been submitted for review', 'Dismiss', {
        duration: 5000
    });
    this.refresh.emit();
  }

  handleNotSubmitted(e: any) {
    this.snackBar.open('Something went wrong and your commit was not able to be submitted', 'Dismiss', {
        duration: 5000
    });
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


  unpublished (): boolean {
    return this.appService.config.versionControl &&
           this.service.status &&
           this.service.status.unpublished;
  }

}
