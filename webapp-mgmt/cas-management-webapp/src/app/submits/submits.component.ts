import { Component, OnInit, ViewChild } from '@angular/core';
import {SubmitService} from './submits.service';
import { Branch } from '../../domain/branch';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {RevertComponent} from '../revert/revert.component';
import {Router} from '@angular/router';
import {PaginatorComponent} from '../paginator/paginator.component';

@Component({
  selector: 'app-submits',
  templateUrl: './submits.component.html',
  styleUrls: ['./submits.component.css']
})

export class SubmitsComponent implements OnInit {

  displayedColumns = ['actions', 'status', 'name', 'message'];
  dataSource: MatTableDataSource<Branch>;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  selectedItem: Branch;
  revertBranch: Branch;

  constructor(private service: SubmitService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.refresh();
  }

  refresh() {
    this.service.getSubmits().subscribe(resp => this.dataSource.data = resp);
  }


  getNotes() {
    this.router.navigate(['notes', this.selectedItem.id]);
  }


  status(branch: Branch): String {
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

  openModalRevert(branch: Branch) {
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
    this.service.revert(this.revertBranch.name as string)
      .subscribe(resp => {
        this.snackBar.open('Branch has been reverted', 'Dismiss', {
          duration: 5000
        });
        this.refresh()
      });
  }

}
