import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {ViewComponent} from '@app/project-share/view/view.component';
import {ChangesService} from './changes.service';
import {DiffEntry, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})

export class ChangesComponent implements OnInit {
    displayedColumns = ['actions', 'file', 'change'];
    dataSource: MatTableDataSource<DiffEntry>;

    @ViewChild(PaginatorComponent, { static: true })
    paginator: PaginatorComponent;

    selectedItem: DiffEntry;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public service: ChangesService,
                public snackBar: MatSnackBar,
                public dialog: MatDialog,
                public spinner: SpinnerService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
  }

  viewDiff() {
    this.spinner.start('Loading diff');
    this.service.viewDiff(this.selectedItem.oldId, this.selectedItem.newId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(f => {
          this.dialog.open(ViewComponent, {
            data: [f, 'diff', 'github'],
            width: '900px',
            position: {top: '50px'}
          })
        },
        (error) => this.snackBar.open(error.error.message, 'Dismiss'));
  }

  viewChange() {
    this.router.navigate(['form/view', this.selectedItem.newId]);
  }
}
