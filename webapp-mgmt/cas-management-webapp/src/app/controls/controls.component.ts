import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Messages} from '../messages';
import {ControlsService} from './controls.service';
import {Location} from '@angular/common';
import {UserService} from '../user.service';
import {PublishComponent} from '../publish/publish.component';
import {Commit} from '../../domain/commit';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CommitComponent} from '../commit/commit.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})

export class ControlsComponent implements OnInit {

  isAdmin = false;
  showCommit = false;
  publishDirty = false;
  userAhead = false;

  @Input()
  showEdit: boolean;

  @Input()
  showRefresh: boolean;

  @ViewChild('publishModal')
  submitComp: PublishComponent;

  @Output()
  save: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(public messages: Messages,
              public service: ControlsService,
              private router: Router,
              private userService: UserService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public location: Location) { }

  ngOnInit() {
    this.userService.getUser().then(resp => this.isAdmin = resp.administrator);
    this.service.untracked();
    this.unpublished();
  }

  goBack() {
    this.location.back();
  }

  openModalCommit() {
      const dialogRef = this.dialog.open(CommitComponent, {
          data: [this.service.changes, this.isAdmin],
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
    } else if (!this.isAdmin) {
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
    this.publishDirty = true;
    this.userAhead = true;
    this.service.untracked().then();
    this.snackBar.open(this.messages.management_services_status_committed, 'Dismiss', {
        duration: 5000
    });
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
    this.publishDirty = false;
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
    this.publishDirty = true;
    this.userAhead = true;
    this.service.untracked().then();
    this.snackBar.open('Your commit has been submitted for review', 'Dismiss', {
        duration: 5000
    });
  }

  handleNotSubmitted(e: any) {
    this.snackBar.open('Something went wrong and your commit was not able to be submitted', 'Dismiss', {
        duration: 5000
    });
  }

  unpublished () {
    this.service.unpublished()
      .then(behind => this.publishDirty = behind > 0);
  }

}
