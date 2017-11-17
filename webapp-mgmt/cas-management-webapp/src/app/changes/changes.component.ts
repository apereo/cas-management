import { Component, OnInit, ViewChild } from '@angular/core';
import {ChangesService} from './changes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DiffEntry} from '../../domain/diff-entry';
import {Location} from '@angular/common';
import {Messages} from '../messages';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})

export class ChangesComponent implements OnInit {
    displayedColumns = ['actions', 'file', 'change'];
    dataSource: MatTableDataSource<DiffEntry>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    selectedItem: DiffEntry;

    constructor(public messages: Messages,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                private service: ChangesService,
                public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
      setTimeout(() => {
        this.dataSource.data = data.resp;
      },10);
      });
  }

  viewDiff() {
    this.router.navigate(['/diff', {oldId: this.selectedItem.oldId, newId: this.selectedItem.newId}]);
  }

  viewChange() {
    this.router.navigate(['/view', this.selectedItem.newId]);
  }
}
