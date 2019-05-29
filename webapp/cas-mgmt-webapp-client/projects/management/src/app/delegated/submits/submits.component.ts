import { Component, OnInit, ViewChild } from '@angular/core';
import {SubmitService} from './submits.service';
import {Branch, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {RevertComponent} from '@app/project-share';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-submits',
  templateUrl: './submits.component.html',
  styleUrls: ['./submits.component.css']
})

export class SubmitsComponent implements OnInit {

  displayedColumns = ['actions', 'status', 'name', 'message'];
  dataSource: MatTableDataSource<Branch>;

  @ViewChild(PaginatorComponent, {static: true})
  paginator: PaginatorComponent;

  selectedItem: Branch;
  revertBranch: Branch;

  constructor(private service: SubmitService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router,
              private route: ActivatedRoute,
              private spinner: SpinnerService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resp: Branch[]}) => {
      this.dataSource = new MatTableDataSource(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

  refresh() {
    this.spinner.start('Refreshing');
    this.service.getSubmits()
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.dataSource.data = resp);
  }


  getNotes() {
    this.router.navigate(['notes', this.selectedItem.id]);
  }


  status(branch: Branch): string {
    if (!branch) {
      return;
    }
    if (branch.accepted) {
      return 'Accepted';
    } else if (branch.reverted) {
      return 'Reverted';
    } else if (branch.rejected) {
      return 'Rejected';
    } else {
      return 'Pending';
    }
  }

  openModalRevert() {
    const dialogRef = this.dialog.open(RevertComponent, {
      data: this.selectedItem,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.revert();
      }
    });
    this.revertBranch = this.selectedItem;
  }

  revert() {
    this.spinner.start('Reverting');
    this.service.revert(this.revertBranch.name)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(() => {
        this.snackBar
          .open('Branch has been reverted',
            'Dismiss',
            {duration: 5000}
          );
        this.refresh();
      });
  }
}
