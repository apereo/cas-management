import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceItem} from '../../domain/service-item';
import {Messages} from '../messages';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceViewService} from './service.service';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {DeleteComponent} from '../delete/delete.component';
import {ControlsService} from '../controls/controls.service';
import {RevertComponent} from '../revert/revert.component';
import {AppConfigService} from '../app-config.service';
import {PaginatorComponent} from '../paginator/paginator.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  deleteItem: ServiceItem;
  domain: String;
  selectedItem: ServiceItem;
  revertItem: ServiceItem;
  dataSource: MatTableDataSource<ServiceItem>;
  displayedColumns = ['actions', 'name', 'serviceId', 'description'];

  @ViewChild(PaginatorComponent)
  paginator: PaginatorComponent;

  constructor(public messages: Messages,
              private route: ActivatedRoute,
              private router: Router,
              private service: ServiceViewService,
              public appService: AppConfigService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public controlsService: ControlsService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator.paginator;
    this.route.data
      .subscribe((data: { resp: ServiceItem[]}) => {
        if (!data.resp) {
          this.snackBar.open(this.messages.management_services_status_listfail, 'dismiss', {
            duration: 5000
          });
        }
        setTimeout(() => {
          this.dataSource.data = data.resp;
        }, 10);
      }
    );
    this.route.params.subscribe((params) => this.domain = params['domain']);
  }

  ngAfterViewInit() {

  }

  serviceEdit(item?: ServiceItem) {
    if (item) {
      this.selectedItem = item;
    }
    this.router.navigate(['/form', this.selectedItem.assignedId]);
  }

  getYaml() {
    this.router.navigate(['/yaml', this.selectedItem.assignedId]);
  }

  getJson() {
    this.router.navigate(['/json', this.selectedItem.assignedId]);
  }

  serviceDuplicate() {
    this.router.navigate(['/duplicate', this.selectedItem.assignedId]);
  }

  openModalDelete() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: this.selectedItem,
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
    this.deleteItem = this.selectedItem;
  };

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

  delete() {
    const myData = {id: this.deleteItem.assignedId};

    this.service.delete(Number.parseInt(this.deleteItem.assignedId as string))
      .then(resp => this.handleDelete(resp))
      .catch((e: any) => this.snackBar.open(e.message || e.text(), 'Dismiss', {
        duration: 5000
      }));
  };

  handleDelete(name: String) {
    this.snackBar.open(name + ' ' + this.messages.management_services_status_deleted, 'Dismiss', {
      duration: 5000
    });
    this.refresh();
  }

  history() {
    const fileName: string = ('service-' + this.selectedItem.assignedId + '.json').replace(/ /g, '');
    this.router.navigate(['/history', fileName]);
  }

  revert() {
    const fileName: string = ('service-' + this.revertItem.assignedId + '.json').replace(/ /g, '');
    this.service.revert(fileName)
      .then(resp => this.handleRevert());
  }

  handleRevert() {
    this.refresh();
    this.snackBar.open("Change has been reverted", "Dismiss", {
      duration: 5000
    });
  }


  refresh() {
    this.getServices();
    this.controlsService.gitStatus();
  }

  getServices() {
    this.service.getServices(this.domain)
      .then(resp => this.dataSource.data = resp)
      .catch((e: any) => this.snackBar.open(this.messages.management_services_status_listfail, 'Dismiss', {
        duration: 5000
      }));
  }

  moveUp(a: ServiceItem) {
    const index: number = this.dataSource.data.indexOf(a);
    if (index > 0) {
      const b: ServiceItem = this.dataSource.data[index - 1];
      a.evalOrder = index - 1;
      b.evalOrder = index;
      this.service.updateOrder(a, b).then(resp => this.refresh());
    }
  }

  moveDown(a: ServiceItem) {
    const index: number = this.dataSource.data.indexOf(a);
    if (index < this.dataSource.data.length - 1) {
      const b: ServiceItem = this.dataSource.data[index + 1];
      a.evalOrder = index + 1;
      b.evalOrder = index;
      this.service.updateOrder(a, b).then(resp => this.refresh());
    }
  }

  showMoveDown(): boolean {
    if (!this.selectedItem) {
      return false;
    }
    const index = this.dataSource.data.indexOf(this.selectedItem);
    return index < this.dataSource.data.length - 1;
  }
  showMoveUp(): boolean {
    if (!this.selectedItem) {
      return false;
    }
    const index = this.dataSource.data.indexOf(this.selectedItem);
    return index > 0;
  }

  showHistory(): boolean {
    return this.appService.config.versionControl &&
           this.selectedItem &&
           this.selectedItem.status !== 'ADD';
  }

  showRevert(): boolean {
    return this.appService.config.versionControl &&
           this.selectedItem &&
           this.selectedItem.status == 'MODIFY';
  }

  added(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'ADDED';
  }

  modified(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'MODIFY';
  }

  deleted(row: ServiceItem): boolean {
    return this.appService.config.versionControl &&
           row.status === 'DELETE';
  }

  status(row: ServiceItem): String {
    return this.appService.config.versionControl ? row.status : '';
  }
}
