import {Component, OnInit, ViewChild} from '@angular/core';
import {Messages} from '../messages';
import {ControlsService} from '../controls/controls.service';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Change} from '../../domain/change';
import {RevertComponent} from '../revert/revert.component';
import {ServiceViewService} from '../services/service.service';
import {Router} from '@angular/router';
import {ChangesService} from '../changes/changes.service';

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

  @ViewChild('paginator')
  paginator: MatPaginator;

  constructor(public messages: Messages,
              private router: Router,
              private controlsService: ControlsService,
              private service: ServiceViewService,
              private changeService: ChangesService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.datasource = new MatTableDataSource([]);
    this.datasource.paginator = this.paginator;
    this.refresh();
  }

  refresh() {
    this.controlsService.untracked().then(resp => this.datasource.data = resp ? resp : []);
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
  };

  revert() {
    const fileName: string = (this.revertItem.fileName).replace(/ /g, '');
    if (this.revertItem.changeType === 'DELETED') {
      this.service.revertDelete(fileName)
        .then(resp => this.refresh());
    } else {
      this.service.revert(fileName)
        .then(resp => this.refresh());
    }
  }

  viewDiff() {
    this.router.navigate(['/diff', {oldId: this.selectedItem.oldId, newId: this.selectedItem.newId}]);
  }

  viewJSON() {
    const id = this.selectedItem.changeType === 'DELETE' ? this.selectedItem.oldId : this.selectedItem.newId;
    this.router.navigate(['/json', id]);
  }

}
