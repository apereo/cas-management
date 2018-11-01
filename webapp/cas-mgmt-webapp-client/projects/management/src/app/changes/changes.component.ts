import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {DiffViewComponent} from '../diff-view/diff-view.component';
import {ChangesService} from './changes.service';
import {DiffEntry, PaginatorComponent} from 'mgmt-lib';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})

export class ChangesComponent implements OnInit {
    displayedColumns = ['actions', 'file', 'change'];
    dataSource: MatTableDataSource<DiffEntry>;

    @ViewChild(PaginatorComponent)
    paginator: PaginatorComponent;

    selectedItem: DiffEntry;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public service: ChangesService,
                public snackBar: MatSnackBar,
                public dialog: MatDialog) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
  }

  viewDiff() {
    this.service.viewDiff(this.selectedItem.oldId, this.selectedItem.newId)
      .subscribe(f => {
          this.dialog.open(DiffViewComponent, {
            data: [f, 'diff', 'github'],
            width: '900px',
            position: {top: '50px'}
          })
        },
        (error) => {console.log(error); this.snackBar.open(error.error, 'Dismiss')});
  }

  //viewDiff() {
  //  this.router.navigate(['/diff', {oldId: this.selectedItem.oldId, newId: this.selectedItem.newId}]);
  //}

  viewChange() {
    this.router.navigate(['/view', this.selectedItem.newId]);
  }
}
