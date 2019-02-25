import {Component, OnInit, ViewChild} from '@angular/core';
import {Change, PaginatorComponent, SpinnerService} from 'mgmt-lib';
import {ControlsService, RevertComponent, ViewComponent} from '@app/project-share';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ServiceViewService} from '@app/registry/services/service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangesService} from '../changes/changes.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-local-changes',
  templateUrl: './local-changes.component.html',
  styleUrls: ['./local-changes.component.css']
})
export class LocalChangesComponent implements OnInit {

  selectedItem: Change;
  revertItem: Change;
  displayedColumns = ['actions', 'serviceName', 'changeType'];
  datasource: MatTableDataSource<Change>;
  loading: boolean;

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private controlsService: ControlsService,
              private service: ServiceViewService,
              private changeService: ChangesService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public spinner: SpinnerService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {resp: Change[]}) => {
      this.datasource = new MatTableDataSource(data.resp);
      this.datasource.paginator = this.paginator.paginator;
    });
  }

  refresh() {
    this.spinner.start('Refreshing');
    this.controlsService.untracked()
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.datasource.data = resp ? resp : []);
    this.controlsService.gitStatus();
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
    this.revertItem = this.selectedItem;
  }

  revert() {
    this.spinner.start('Reverting change');
    if (this.revertItem.changeType === 'ADD') {
      this.service.deleteService(+this.revertItem.id)
        .pipe(finalize(() => this.spinner.stop()))
        .subscribe(resp => this.handleRevert());
    } else {
      this.service.revert(this.revertItem.oldId)
        .pipe(finalize(() => this.spinner.stop()))
        .subscribe(resp => this.handleRevert());
    }
  }

  handleRevert() {
    this.refresh();
    this.snackBar
      .open('Change has been reverted',
        'Dismiss',
        {duration: 5000}
      );
  }

  viewDiff() {
    this.spinner.start('Loading diff');
    this.changeService.viewDiff(this.selectedItem.oldId, this.selectedItem.newId)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.openView(resp, 'diff', 'github'));
  }

  viewJSON() {
    const id = this.selectedItem.changeType === 'DELETE' ? this.selectedItem.oldId : this.selectedItem.newId;
    this.spinner.start('Loading change');
    this.changeService.viewJson(id)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.openView(resp, 'hjson', 'eclipse'));
  }

  viewYaml() {
    const id = this.selectedItem.changeType === 'DELETE' ? this.selectedItem.oldId : this.selectedItem.newId;
    this.spinner.start('Loading yaml');
    this.changeService.viewYaml(id)
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.openView(resp, 'yaml', 'eclipse'));
  }

  openView(text: string, mode: string, theme: string) {
    this.dialog.open(ViewComponent, {
      data: [text, mode, theme],
      width: '900px',
      position: {top: '50px'}
    });
  }

}
