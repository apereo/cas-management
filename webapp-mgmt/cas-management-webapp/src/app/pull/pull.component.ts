import {Component, OnInit, ViewChild } from '@angular/core';
import {Messages} from '../messages';
import {Router} from '@angular/router';
import { Branch } from '../../domain/branch';
import {PullService} from './pull.service';
import { Location } from '@angular/common';
import {NotesService} from '../notes/notes.service';
import {ChangesService} from '../changes/changes.service';
import {DiffEntry} from '../../domain/diff-entry';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  rejectBranch: Branch;
  acceptBranch: Branch;
  selectedBranch: Branch;
  changes: DiffEntry[];

  showPending = true;
  showAccepted: boolean;
  showRejected: boolean;

  constructor(public messages: Messages,
              private router: Router,
              private service: PullService,
              private location: Location,
              private notesService: NotesService,
              private changeService: ChangesService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.refresh();
  }

  refresh() {
    this.service.getBranches([this.showPending, this.showAccepted, this.showRejected])
      .then(resp => this.dataSource.data = resp);
  }

  viewChanges(branch?: Branch) {
    if (branch) {
      this.selectedBranch = branch;
    }

    this.router.navigate(['/changes', this.selectedBranch.name]);
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

  accept(note: String) {
    this.service.accept(this.acceptBranch, note)
        .then(resp => {
          this.snackBar.open('Branch has been merged', 'Dismiss', {
            duration: 5000
          });
          this.refresh();
        });

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

  reject(note: String) {
    this.service.reject(this.rejectBranch, note)
        .then(resp => {
          this.snackBar.open('Branch has beem marked as rejected', 'Dismiss', {
            duration: 5000
          });
          this.refresh();
        });
  }

  addNote() {
  }

  cancel() {
  }

  getNotes() {
    this.router.navigate(['notes', this.selectedBranch.id]);
  }

  saveNote(note: String) {
  }

  handleSaveNote(msg: String) {
  }

  status(branch: Branch): String {
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

 }
