import { Component, OnInit, ViewChild } from '@angular/core';
import {SubmitService} from './submits.service';
import {Branch} from 'domain-lib';
import {PaginatorComponent} from 'shared-lib';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RevertComponent} from '../../project-share/revert/revert.component';

@Component({
  selector: 'app-submits',
  templateUrl: './submits.component.html',
  styleUrls: ['./submits.component.css']
})

export class SubmitsComponent implements OnInit {

  displayedColumns = ['actions', 'status', 'name', 'message'];
  dataSource: MatTableDataSource<Branch>;

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent;

  selectedItem: Branch;
  revertBranch: Branch;

  constructor(private service: SubmitService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resp: Branch[]}) => {
      this.dataSource = new MatTableDataSource(data.resp);
      this.dataSource.paginator = this.paginator.paginator;
    });
  }

  refresh() {
    this.service.getSubmits('Refreshing')
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
    this.service.revert(this.revertBranch.name)
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
