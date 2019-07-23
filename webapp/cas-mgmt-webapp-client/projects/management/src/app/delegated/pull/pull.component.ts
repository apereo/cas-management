import {Component, OnInit, ViewChild } from '@angular/core';
import {Branch, DiffEntry} from 'domain-lib';
import {PaginatorComponent} from 'shared-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {PullService} from './pull.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {ControlsService} from '@app/project-share';
import {AcceptComponent} from '../accept/accept.component';
import {RejectComponent} from '../reject/reject.component';

@Component({

  selector: 'app-pull',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.css']
})

export class PullComponent implements OnInit {

  displayedColumns = ['actions', 'branch', 'status', 'message'];
  dataSource: MatTableDataSource<Branch>;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  rejectBranch: Branch;
  acceptBranch: Branch;
  selectedBranch: Branch;
  changes: DiffEntry[];

  showPending = true;
  showAccepted: boolean;
  showRejected: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PullService,
              private location: Location,
              private controlsService: ControlsService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Branch[]}) => {
      this.dataSource = new MatTableDataSource(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

  refresh() {
    this.service.getBranches([this.showPending, this.showAccepted, this.showRejected], "Refreshing")
      .subscribe(resp => this.dataSource.data = resp);
    this.controlsService.gitStatus();
  }

  viewChanges(branch?: Branch) {
    if (branch) {
      this.selectedBranch = branch;
    }
    this.router.navigate(['../version-control/changes', this.selectedBranch.name]);
  }

  openAcceptModal() {
    const dialogRef = this.dialog.open(AcceptComponent, {
      data: [],
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accept(result);
      }
    });
    this.acceptBranch = this.selectedBranch;
  }

  accept(note: string) {
    this.service.accept(this.acceptBranch, note)
      .subscribe(() => this.showSnackAndRefresh('Branch has been merged'));
  }

  openRejectModal() {
    const dialogRef = this.dialog.open(RejectComponent, {
      data: this.selectedBranch,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reject(result);
      }
    });
    this.rejectBranch = this.selectedBranch;
  }

  reject(note: string) {
    this.service.reject(this.rejectBranch, note)
      .subscribe(() => this.showSnackAndRefresh('Branch has been marked as rejected'));
  }

  addNote() {
  }

  cancel() {
  }

  getNotes() {
    this.router.navigate(['notes', this.selectedBranch.id]);
  }

  saveNote(note: string) {
  }

  handleSaveNote(msg: string) {
  }

  status(branch: Branch): string {
    if (branch) {
      if (branch.accepted) {
        return 'Accepted';
      } else if (branch.rejected) {
        return 'Rejected';
      } else {
        return 'Pending';
      }
    }
  }

  showSnackAndRefresh(msg: string) {
    this.snackBar.open(msg, 'Dismiss', {duration: 5000});
    this.refresh();
  }
 }
