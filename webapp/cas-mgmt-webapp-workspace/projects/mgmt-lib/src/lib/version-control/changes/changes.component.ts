import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {ChangesService} from './changes.service';
import {AppConfigService, ControlsService, PaginatorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {DiffEntry} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Component to display changes for a pull request branch.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})

export class ChangesComponent implements OnInit {
    displayedColumns = ['actions', 'file', 'change'];
    dataSource: MatTableDataSource<DiffEntry>;

    @ViewChild(PaginatorComponent, {static: true})
    paginator: PaginatorComponent;

    selectedItem: DiffEntry;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public service: ChangesService,
                public app: AppConfigService,
                public controls: ControlsService,
                public dialog: MatDialog) {
      this.controls.icon = 'visibility';
      this.controls.title = 'Changes';
    }

  /**
   * Extracts differences from resolver and loads them into table.
   */
  ngOnInit() {
    this.route.data
      .subscribe((data: { resp: DiffEntry[]}) => {
        this.dataSource = new MatTableDataSource(data.resp);
        this.dataSource.paginator = this.paginator.paginator;
      });
    this.controls.resetButtons();
  }

  /**
   * Does a diff on two versions and display the result in the ViewComponent.
   */
  viewDiff() {
    this.service.viewDiff(this.selectedItem.oldId, this.selectedItem.newId)
      .subscribe(f => this.app.openView(f, 'diff', 'github'),
        (error) => this.app.showSnackBar(error.error.message)
      );
  }

  /**
   * Navigates the router to FormComponent to view the version of the selected item.
   */
  viewChange() {
    this.service.viewJson(this.selectedItem.newId)
      .subscribe(resp => this.app.openView(resp, 'hjson'));
    
  }
}
