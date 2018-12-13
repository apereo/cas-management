import {Component, OnInit, ViewChild } from '@angular/core';
import {Branch, DiffEntry, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {PullService} from './pull.service';
import { Location } from '@angular/common';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {AcceptComponent} from '../accept/accept.component';
import {RejectComponent} from '../reject/reject.component';
import {ControlsService} from '../../project-share/controls/controls.service';
import {finalize} from 'rxjs/operators';

@Component({

  selector: 'app-pull',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.css']
})

export class PullComponent implements OnInit {

  displayedColumns = ['actions', 'branch', 'status', 'message'];
  dataSource: MatTableDataSource<Branch>;

  @ViewChild(PaginatorComponent)
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
              public snackBar: MatSnackBar,
              public spinner: SpinnerService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Branch[]}) => {
      this.dataSource = new MatTableDataSource(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

  refresh() {
    this.spinner.start('Refreshing');
    this.service.getBranches([this.showPending, this.showAccepted, this.showRejected])
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.dataSource.data = resp);
    this.controlsService.gitStatus();
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
    this.spinner.start('Accepting request');
    this.service.accept(this.acceptBranch, note)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(() => {
          this.snackBar
            .open('Branch has been merged',
              'Dismiss',
              {duration: 5000}
            );
          this.refresh();
        }
      );
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
    this.spinner.start('Rejecting request');
    this.service.reject(this.rejectBranch, note)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(() => {
        this.snackBar
          .open('Branch has beem marked as rejected',
                'Dismiss',
                {duration: 5000}
          );
          this.refresh();
        }
      );
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
